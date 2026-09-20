#!/bin/bash
# Upload brand assets to Prismic Asset API (paced for 1 req/sec)
JWT="${PRISMIC_WRITE_TOKEN:?set PRISMIC_WRITE_TOKEN}"
KEY="${PRISMIC_MIGRATION_KEY:?set PRISMIC_MIGRATION_KEY}"
REPO="lanternsledgers"
cd "$(dirname "$0")/../public/custom_assets"

up() { # up <filepath> <nickname>
  curl -sS -X POST "https://asset-api.prismic.io/assets" \
    -H "Authorization: Bearer $JWT" \
    -H "x-api-key: $KEY" \
    -H "repository: $REPO" \
    -F "file=@$1" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(json.dumps({'nick': '$2', 'id': d.get('id'), 'url': d.get('url'), 'w': d.get('width'), 'h': d.get('height'), 'kind': d.get('kind')}))
" 2>/dev/null || echo "{\"nick\": \"$2\", \"error\": true}"
  sleep 1.2
}

up "Logo Assets/Lanterns_Ledgers_04_One_Colour_Navy.png" "logo-navy"
up "Logo Assets/Lanterns_Ledgers_03_Badge_Avatar.png" "badge"
up "Services/Book-Keeping.jpg" "svc-bookkeeping"
up "Services/Budgeting.jpg" "svc-budgeting"
up "Services/Forecasting.jpg" "svc-forecasting"
up "Services/Mangement Accounts.jpg" "svc-management"
up "Services/Scenario Planning.jpg" "svc-scenario"
up "aboutme.jpeg" "aboutme"
up "Website storytelling images/1. Hero Image/fractional-finance-clarity-hero-illustration-01.png" "hero-1"
up "Website storytelling images/1. Hero Image/fractional-finance-clarity-hero-illustration-02.png" "hero-2"
up "Website storytelling images/1. Hero Image/fractional-finance-clarity-hero-illustration-03.png" "hero-3"
up "Website storytelling images/2. Approach - from tangle to pattern/finance-untangled-clarity-illustration-01.png" "untangled-1"
up "Website storytelling images/2. Approach - from tangle to pattern/finance-untangled-clarity-illustration-02.png" "untangled-2"
up "Website storytelling images/2. Approach - from tangle to pattern/finance-untangled-clarity-illustration-03.png" "untangled-3"
up "Website storytelling images/3. Trust/trusted-finance-partner-illustration-01.png" "trust-1"
up "Website storytelling images/3. Trust/trusted-finance-partner-illustration-02.png" "trust-2"
