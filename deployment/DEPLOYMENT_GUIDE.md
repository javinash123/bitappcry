# SimpleBit Frontend Deployment Guide

## Deployment Location
- **URL**: http://3.208.52.220/simplebit/
- **Deploy Folder**: `simplebit`

## Deployment Steps for AWS EC2

### Option 1: Using Apache Web Server (Recommended)

1. **Connect to your EC2 instance**
   ```bash
   ssh -i your-key.pem ec2-user@3.208.52.220
   ```

2. **Install Apache (if not already installed)**
   ```bash
   sudo yum install -y httpd
   sudo systemctl start httpd
   sudo systemctl enable httpd
   ```

3. **Deploy the files**
   ```bash
   # Navigate to web root
   cd /var/www/html
   
   # Upload the simplebit folder here
   # You can use SCP: scp -i your-key.pem -r simplebit ec2-user@3.208.52.220:/var/www/html/
   ```

4. **Set proper permissions**
   ```bash
   sudo chown -R apache:apache /var/www/html/simplebit
   sudo chmod -R 755 /var/www/html/simplebit
   ```

5. **Enable mod_rewrite if not already enabled**
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart httpd
   ```

6. **Access your app**
   - Navigate to: http://3.208.52.220/simplebit/

### Option 2: Using Nginx

1. **Create nginx configuration**
   ```bash
   sudo vi /etc/nginx/conf.d/simplebit.conf
   ```

2. **Add this configuration**
   ```nginx
   server {
       listen 80;
       server_name 3.208.52.220;
       
       location /simplebit/ {
           alias /var/www/html/simplebit/;
           try_files $uri $uri/ /simplebit/index.html;
       }
   }
   ```

3. **Deploy files and restart**
   ```bash
   sudo cp -r simplebit /var/www/html/
   sudo systemctl restart nginx
   ```

## Folder Structure

```
deployment/
└── simplebit/
    ├── index.html
    ├── favicon.png
    ├── opengraph.jpg
    ├── .htaccess (for Apache routing)
    └── assets/
        ├── index-BsaHdDSR.css
        ├── index-BjsfgySl.js
```

## Important Notes

- The `.htaccess` file handles URL routing for Single Page Application (SPA)
- All routes are directed to `index.html` for client-side routing to work
- The build is optimized and production-ready
- CSS and JS files are minified and optimized
- All assets use content-based hashing for cache busting

## Troubleshooting

**Issue: 404 errors on page refresh**
- Solution: Make sure `mod_rewrite` is enabled and `.htaccess` is being read
- Check: `sudo apache2ctl -M | grep rewrite`

**Issue: Assets not loading**
- Solution: Check file permissions and ensure `/var/www/html/simplebit/` is readable

**Issue: Blank page**
- Solution: Check browser console for errors, verify all files are deployed correctly
