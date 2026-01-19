# Custom Domain Setup Guide

Your site is configured to use the custom domain: **anishpolakala.com**

## ✅ What's Been Done

1. **CNAME file created** - Tells GitHub Pages to serve your site at anishpolakala.com
2. **next.config.ts updated** - Removed basePath (not needed for custom domains)
3. **Static export enabled** - Site will be compiled to static HTML

## 🔧 DNS Configuration Required

You need to configure DNS records at your domain registrar (where you bought anishpolakala.com):

### Option 1: Apex Domain (anishpolakala.com)

Add these **A records** pointing to GitHub Pages:

```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153
```

### Option 2: WWW Subdomain (www.anishpolakala.com)

Add this **CNAME record**:

```
Type: CNAME
Host: www
Value: princecharming001.github.io
```

### Recommended: Both Apex and WWW

Configure both options above, then set up a redirect from www to apex (or vice versa).

## 🌐 GitHub Pages Settings

1. Go to: https://github.com/princecharming001/anishpolakala/settings/pages
2. Under **"Custom domain"**: Enter `anishpolakala.com`
3. Wait for DNS check to pass (can take 24-48 hours)
4. Once passed, check **"Enforce HTTPS"**

## ⏱️ Timeline

- **Immediate**: GitHub Pages will try to provision SSL certificate
- **10-60 minutes**: DNS propagation (if registrar is fast)
- **24-48 hours**: Full DNS propagation worldwide
- **After DNS works**: GitHub auto-provisions SSL certificate (takes ~1 hour)

## 🔍 Check DNS Propagation

Use these tools to verify your DNS is set up correctly:

- https://dnschecker.org
- https://www.whatsmydns.net

Enter `anishpolakala.com` and check that A records point to GitHub's IPs.

## 🐛 Troubleshooting

### "Your connection is not private" / SSL Error

**Cause**: DNS not configured yet OR SSL certificate still provisioning

**Fix**: 
1. Verify DNS records are correct at your registrar
2. Wait for DNS to propagate
3. Once DNS works, GitHub auto-provisions SSL (takes 1 hour)
4. Clear browser cache after SSL is ready

### Site shows 404

**Cause**: Custom domain not configured in GitHub Pages settings

**Fix**:
1. Go to repository settings → Pages
2. Enter `anishpolakala.com` in Custom domain field
3. Wait for DNS check to pass

### DNS Check Fails in GitHub

**Cause**: DNS records not set up or not propagated yet

**Fix**:
1. Double-check DNS records at your registrar
2. Wait 24-48 hours for propagation
3. Use dnschecker.org to verify

## 📋 Where to Configure DNS

Common domain registrars and where to find DNS settings:

- **Namecheap**: Dashboard → Domain List → Manage → Advanced DNS
- **GoDaddy**: Domain Settings → DNS Management
- **Google Domains**: DNS → Custom records
- **Cloudflare**: DNS → Records

## 🚀 Temporary Access

While DNS is being set up, you can still access your site at:

**https://princecharming001.github.io/anishpolakala/**

Note: This URL will show a 404 now because we removed the basePath. Once DNS is configured, use anishpolakala.com.

## ✨ After DNS Works

Once DNS is configured and SSL is provisioned:

1. Your site will be live at **https://anishpolakala.com**
2. SSL will be automatically managed by GitHub
3. Every push to main will auto-deploy
4. The site will be fast (GitHub's CDN)

## 📞 Need Help?

If you're stuck:
1. Check your domain registrar's documentation for DNS setup
2. Verify DNS propagation with dnschecker.org
3. Make sure custom domain is entered in GitHub Pages settings
4. Wait the full 24-48 hours for DNS propagation
