# SimpleBit Deployment Checklist - AWS EC2 Apache

## Quick Reference: Your Deployment Details
- **Server**: AWS EC2 Linux2
- **Web Server**: Apache
- **Deployment Path**: `/var/www/html/simplebitmerchant/`
- **URL**: `http://3.208.52.220/simplebitmerchant/`
- **Base Path**: `/simplebitmerchant/`

## Pre-Deployment Checklist

### ✓ Local Build
- [x] Production build created: `NODE_ENV=production npm run build`
- [x] Files location: `dist/public/`
- [x] Base path configured: `/simplebitmerchant/` in vite.config.ts
- [x] .htaccess file included with correct rewrite rules

### ✓ Critical Files
- [x] `index.html` - Main entry point
- [x] `assets/` - JavaScript and CSS bundles
- [x] `.htaccess` - Rewrite rules for subdirectory routing
- [x] Static files - logos, favicons, etc.

## EC2 Setup (One-Time)

```bash
# 1. SSH into your instance
ssh -i your-key.pem ec2-user@3.208.52.220

# 2. Install Apache (if needed)
sudo yum install -y httpd

# 3. Enable rewrite module (CRITICAL)
sudo a2enmod rewrite

# 4. Create deployment directory
sudo mkdir -p /var/www/html/simplebitmerchant
sudo chown -R ec2-user:ec2-user /var/www/html/simplebitmerchant

# 5. Create/update Apache config
sudo nano /etc/httpd/conf.d/simplebitmerchant.conf
```

## First Deployment

```bash
# From your local machine
scp -i your-key.pem -r dist/public/* ec2-user@3.208.52.220:/var/www/html/simplebitmerchant/

# SSH back into instance
ssh -i your-key.pem ec2-user@3.208.52.220

# Verify files
ls /var/www/html/simplebitmerchant/

# Set permissions
sudo chown -R apache:apache /var/www/html/simplebitmerchant
sudo chmod -R 755 /var/www/html/simplebitmerchant

# Verify .htaccess
ls -la /var/www/html/simplebitmerchant/.htaccess

# Restart Apache
sudo systemctl restart httpd

# Check status
sudo systemctl status httpd
```

## Test Your Deployment

1. Open browser: `http://3.208.52.220/simplebitmerchant/`
2. Should see login page ✓
3. Click around - no 404 errors ✓
4. Check browser console (F12) - no errors ✓

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 errors on routes | Verify .htaccess exists and rewrite module enabled |
| CSS/JS files return 404 | Check file permissions: `chmod -R 755` |
| Blank page | Check browser console, check Apache error log: `tail -f /var/log/httpd/error_log` |
| Can't find files | Verify upload: `ls /var/www/html/simplebitmerchant/` |

## Future Updates

Each time you update the app:

```bash
# Local
NODE_ENV=production npm run build

# Deploy
scp -i your-key.pem -r dist/public/* ec2-user@3.208.52.220:/var/www/html/simplebitmerchant/

# Reload Apache
ssh -i your-key.pem ec2-user@3.208.52.220 "sudo systemctl reload httpd"
```

## Critical Apache Configuration Required

Make sure `/etc/httpd/conf.d/simplebitmerchant.conf` contains:

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

## File Manifest

Your deployment includes:
```
dist/public/
├── index.html                      # Main app
├── .htaccess                       # Apache rewrite rules
├── assets/
│   ├── index-*.css                 # Styles
│   └── index-*.js                  # App bundle
├── apple-pay-logo.svg              # Payment assets
├── google-pay-logo.svg
└── opengraph.jpg                   # Meta image
```

## Notes

- The vite.config.ts is already set up with `base: "/simplebitmerchant/"` for production
- No backend API is needed for static deployment (if using only frontend)
- .htaccess handles all SPA routing - all requests go to index.html except real files
- Clear browser cache if you see old versions after updates
