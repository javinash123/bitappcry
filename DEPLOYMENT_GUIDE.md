# Deployment Guide for simplebitmerchant to AWS EC2 (Apache)

## Build Information
- **Build Output Directory**: `dist/public/`
- **Build Size**: 5.3 MB
- **Files Included**: 
  - `index.html` - Main entry point
  - `.htaccess` - Apache rewrite rules (CRITICAL - DO NOT MISS)
  - `/assets/` - Bundled JavaScript, CSS, and images
  - Logo files and favicons

## Pre-Deployment Checklist

### 1. Apache Configuration Requirements
Ensure the following Apache modules are enabled on your EC2 instance:
```bash
sudo a2enmod rewrite
sudo a2enmod deflate
sudo a2enmod expires
```

### 2. Verify Apache Configuration
Edit `/etc/httpd/conf/httpd.conf` and ensure `.htaccess` files are allowed in your directory:
```apache
<Directory /var/www/html/simplebitmerchant>
    AllowOverride All
    Require all granted
</Directory>
```

Then restart Apache:
```bash
sudo systemctl restart httpd
```

## Deployment Steps

### Step 1: Prepare the Server Directory
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@3.208.52.220

# Navigate to Apache root
cd /var/www/html

# Create the simplebitmerchant directory if it doesn't exist
sudo mkdir -p simplebitmerchant

# Set proper ownership
sudo chown -R apache:apache /var/www/html/simplebitmerchant
sudo chmod -R 755 /var/www/html/simplebitmerchant
```

### Step 2: Upload the Dist Folder
From your local machine, upload the contents of `dist/public/` to the server:
```bash
scp -i your-key.pem -r dist/public/* ec2-user@3.208.52.220:/var/www/html/simplebitmerchant/
```

**IMPORTANT**: Make sure to include the `.htaccess` file. It should be copied to:
```
/var/www/html/simplebitmerchant/.htaccess
```

### Step 3: Verify File Permissions
```bash
# SSH into the server
ssh -i your-key.pem ec2-user@3.208.52.220

# Set proper permissions
sudo chown -R apache:apache /var/www/html/simplebitmerchant
sudo chmod -R 755 /var/www/html/simplebitmerchant
sudo chmod 644 /var/www/html/simplebitmerchant/.htaccess
sudo chmod 644 /var/www/html/simplebitmerchant/index.html
```

### Step 4: Restart Apache
```bash
sudo systemctl restart httpd
```

## What the Configuration Does

### .htaccess File
The `.htaccess` file in the dist/public folder contains:
- **RewriteEngine**: Enables Apache URL rewriting
- **RewriteBase**: Sets the base path to `/simplebitmerchant/`
- **Rewrite Rules**: Routes all non-file/non-directory requests to `index.html`
  - This allows the React Router (wouter) to handle client-side routing
  - Prevents "404 Not Found" errors for nested routes

### Vite Configuration
- **Base URL**: Set to `/simplebitmerchant/` in `vite.config.ts`
- **Router Base**: Set to `/simplebitmerchant` in `client/src/App.tsx`
- All asset paths are correctly configured relative to the base path

## Testing

After deployment, test the following URLs:

1. **Root**: `http://3.208.52.220/simplebitmerchant/`
   - Should load the login page

2. **Nested Routes**: 
   - `http://3.208.52.220/simplebitmerchant/dashboard`
   - `http://3.208.52.220/simplebitmerchant/invoices`
   - `http://3.208.52.220/simplebitmerchant/create-invoice`
   - All should load without 404 errors

3. **Assets Loading**:
   - Open browser DevTools (F12)
   - Check Network tab - all CSS and JS files should load with status 200
   - Check Console tab - should be no 404 errors

## Troubleshooting

### Blank Page Issues
If you see a blank page:
1. Check browser console (F12 → Console tab)
2. Look for JavaScript errors
3. Check Network tab to see if files are loading (should all be 200 status)

### 404 Errors
If you get 404 errors on nested routes:
1. Verify `.htaccess` is in `/var/www/html/simplebitmerchant/`
2. Check that `mod_rewrite` is enabled: `apache2ctl -M | grep rewrite`
3. Verify `.htaccess` permissions: `ls -la /var/www/html/simplebitmerchant/.htaccess`

### Assets Not Loading
If images/CSS/JS don't load:
1. Verify all files were uploaded to `dist/public/`
2. Check file permissions: files should be 644, directories should be 755
3. Verify the `assets/` folder contains all compiled files

### Browser Cache Issues
- Do a hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- Clear browser cache or test in incognito mode

## File Structure
Your server directory should look like:
```
/var/www/html/simplebitmerchant/
├── .htaccess                    (CRITICAL)
├── index.html
├── favicon.png
├── opengraph.jpg
├── apple-pay-logo.svg
├── google-pay-logo.svg
├── assets/
│   ├── index-*.css
│   ├── index-*.js
│   ├── various image files
│   └── [other asset files]
```

## Notes
- The base path in both Vite config and React Router is set to `/simplebitmerchant/`
- The .htaccess file is configured for Apache on Linux (EC2)
- All asset paths are hashed for cache busting (e.g., `index-DZBjVhzJ.css`)
- The application is a single-page React app - all routing is client-side after the initial index.html load
