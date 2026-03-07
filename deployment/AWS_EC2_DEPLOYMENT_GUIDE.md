# SimpleBit Merchant Dashboard - AWS EC2 Apache Deployment Guide

## Overview
This guide will help you deploy the SimpleBit Merchant Dashboard on AWS Linux2 EC2 instance with Apache to the subdirectory `/simplebitmerchant/`.

**Deployment URL:** `http://3.208.52.220/simplebitmerchant/`

## Prerequisites
- AWS EC2 instance running Amazon Linux 2
- Apache web server (httpd) installed
- SSH access to your instance
- The built production files ready for deployment

## Step 1: Connect to Your EC2 Instance

```bash
ssh -i your-key.pem ec2-user@3.208.52.220
```

## Step 2: Install and Configure Apache

### Install Apache (if not already installed)
```bash
sudo yum update -y
sudo yum install -y httpd
```

### Start Apache and Enable on Boot
```bash
sudo systemctl start httpd
sudo systemctl enable httpd
```

### Verify Apache is Running
```bash
sudo systemctl status httpd
```

## Step 3: Enable Apache Rewrite Module

This is **critical** for routing single-page app requests to `index.html`:

```bash
sudo a2enmod rewrite
```

Or manually enable it by editing `/etc/httpd/conf/httpd.conf`:

Find and uncomment this line:
```
LoadModule rewrite_module modules/mod_rewrite.so
```

Then restart Apache:
```bash
sudo systemctl restart httpd
```

## Step 4: Create Subdirectory

Create the `simplebitmerchant` folder in Apache's document root:

```bash
sudo mkdir -p /var/www/html/simplebitmerchant
sudo chown -R ec2-user:ec2-user /var/www/html/simplebitmerchant
sudo chmod -R 755 /var/www/html/simplebitmerchant
```

## Step 5: Configure Apache VirtualHost (Optional but Recommended)

Create a new configuration file for your site:

```bash
sudo nano /etc/httpd/conf.d/simplebitmerchant.conf
```

Add the following configuration:

```apache
<Directory /var/www/html/simplebitmerchant>
    Options -MultiViews
    AllowOverride All
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /simplebitmerchant/
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-l
        RewriteRule . index.html [L]
    </IfModule>
</Directory>
```

Save the file (Ctrl+X, then Y, then Enter).

Verify Apache configuration:
```bash
sudo apachectl configtest
```

Should output: `Syntax OK`

## Step 6: Deploy Production Files

### Option A: Using SCP (from your local machine)

```bash
scp -i your-key.pem -r dist/public/* ec2-user@3.208.52.220:/var/www/html/simplebitmerchant/
```

### Option B: Using Git (on EC2 instance)

If you have a Git repository:

```bash
cd /var/www/html/simplebitmerchant
git clone <your-repo-url> .
cd /var/www/html/simplebitmerchant
npm install
npm run build
cp -r dist/public/* .
```

## Step 7: Verify .htaccess File

The `.htaccess` file must be present in `/var/www/html/simplebitmerchant/.htaccess` with the correct content:

```bash
cat > /var/www/html/simplebitmerchant/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /simplebitmerchant/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . index.html [L]
</IfModule>
EOF
```

## Step 8: Fix File Permissions

```bash
sudo chown -R apache:apache /var/www/html/simplebitmerchant
sudo chmod -R 755 /var/www/html/simplebitmerchant
sudo chmod 644 /var/www/html/simplebitmerchant/.htaccess
```

## Step 9: Restart Apache

```bash
sudo systemctl restart httpd
```

## Step 10: Test Your Deployment

### Check if files are in place
```bash
ls -la /var/www/html/simplebitmerchant/
```

Should show: `index.html`, `.htaccess`, `assets/`, and other files.

### Test in browser
Navigate to: `http://3.208.52.220/simplebitmerchant/`

The login page should load without 404 errors.

## Troubleshooting

### 404 Error on Subpaths

If you get a 404 error when clicking on routes (e.g., `/simplebitmerchant/invoices`):

1. **Verify .htaccess is present:**
   ```bash
   cat /var/www/html/simplebitmerchant/.htaccess
   ```

2. **Verify rewrite module is enabled:**
   ```bash
   sudo apachectl -t -D DUMP_MODULES | grep rewrite
   ```
   Should show: `rewrite_module (shared)`

3. **Check Apache error logs:**
   ```bash
   sudo tail -f /var/log/httpd/error_log
   ```

4. **Enable .htaccess in directory:**
   ```bash
   sudo nano /etc/httpd/conf/httpd.conf
   ```
   Find `<Directory /var/www/html>` and change `AllowOverride None` to `AllowOverride All`

### Asset Files Not Loading

If CSS/JS files return 404:

1. Verify files exist:
   ```bash
   ls -la /var/www/html/simplebitmerchant/assets/
   ```

2. Check file permissions:
   ```bash
   sudo chmod -R 755 /var/www/html/simplebitmerchant/assets/
   ```

### Blank Page or Wrong Content

1. Check browser console for errors (F12 → Console tab)
2. Verify the base path in `vite.config.ts` is set to `/simplebitmerchant/`
3. Check Apache access logs:
   ```bash
   sudo tail -f /var/log/httpd/access_log | grep simplebitmerchant
   ```

## Important Configuration Notes

### Base Path in vite.config.ts
The production build is configured with:
```typescript
base: process.env.NODE_ENV === "production" ? "/simplebitmerchant/" : "/"
```

This ensures all asset paths and route references work correctly in the subdirectory.

### .htaccess Functionality
The `.htaccess` file performs the following:
- Enables mod_rewrite
- Sets the rewrite base to `/simplebitmerchant/`
- Redirects all non-file/non-directory requests to `index.html`
- Preserves assets and static files as-is

This allows the single-page app to handle routing on the client side.

## Security Considerations

1. **Restrict directory listing:**
   ```bash
   echo "Options -Indexes" | sudo tee -a /var/www/html/simplebitmerchant/.htaccess
   ```

2. **Add HTTP security headers:**
   Create/edit `/etc/httpd/conf.d/security-headers.conf`:
   ```apache
   <IfModule mod_headers.c>
       Header always set X-Frame-Options "SAMEORIGIN"
       Header always set X-Content-Type-Options "nosniff"
       Header always set X-XSS-Protection "1; mode=block"
   </IfModule>
   ```

3. **Use HTTPS with AWS Certificate Manager or Let's Encrypt**

## Performance Optimization

1. **Enable gzip compression:**
   ```bash
   echo "LoadModule deflate_module modules/mod_deflate.so" | sudo tee -a /etc/httpd/conf/httpd.conf
   ```

2. **Add caching headers:**
   ```bash
   cat >> /var/www/html/simplebitmerchant/.htaccess << 'EOF'

# Cache control for static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
EOF
   ```

## Deployment Complete!

Your SimpleBit Merchant Dashboard should now be running at:
**http://3.208.52.220/simplebitmerchant/**

All routes should work correctly without 404 errors.

## Future Updates

To deploy future updates:

1. Build locally:
   ```bash
   NODE_ENV=production npm run build
   ```

2. Deploy new files:
   ```bash
   scp -i your-key.pem -r dist/public/* ec2-user@3.208.52.220:/var/www/html/simplebitmerchant/
   ```

3. Clear any caching if needed:
   - Clear browser cache
   - Ask Apache to reload config: `sudo systemctl reload httpd`
