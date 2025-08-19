#!/bin/bash

# First, let's get an auth token
echo "🔐 Getting auth token..."

# Replace these with your actual admin credentials
ADMIN_EMAIL="your_admin_email@example.com"
ADMIN_PASSWORD="your_admin_password"

# Login and get token
TOKEN_RESPONSE=$(curl -s -X POST "https://vedified-blogs-server.vercel.app/api/admin/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")

echo "Login response: $TOKEN_RESPONSE"

# Extract token (you'll need to parse this JSON)
# TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.token')

# For now, let's test without authentication to see the basic error
echo "📝 Testing blog creation without auth..."

curl -X POST "https://vedified-blogs-server.vercel.app/api/blog/add" \
  -H "Content-Type: multipart/form-data" \
  -F 'Blog={"title":"Test Blog","subtitle":"Test Subtitle","description":"<p>Test content</p>","category":"Technology","isPublished":true}' \
  -F 'image=@/Users/divyanshsingh/Desktop/Vedified/client/src/assets/blog_pic_1.png' \
  -v

echo "✅ Test completed"
