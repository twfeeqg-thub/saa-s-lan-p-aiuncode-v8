#!/bin/bash

# ==============================================================================
#   السكربت المخصص لمشروع صفحة هبوط منصة aiuncode.com
#   (مُعدّل بناءً على هيكل المشروع الفعلي من الصورة)
# ==============================================================================

OUTPUT_FILE="landing_page_profile.txt"

# --- (قائمة الملفات الهامة المستهدفة لمشروع صفحة الهبوط) ---
IMPORTANT_FILES=(
  "README.md"
  "package.json"
  "next.config.js"
  "tailwind.config.js"
  
  # الملفات الأساسية في مجلد app
  "app/layout.tsx"
  "app/page.tsx"
  "app/order/page.tsx" # صفحة الطلب
  
  # مكونات مولد المواقع التفاعلي
  "components/generator/BuildSpeedScreen.tsx"
  "components/generator/FinalScreen.tsx"
  "components/interactive-demo/BuildingScreen.tsx"
  "components/interactive-demo/CustomizationForm.tsx"
  
  # مكونات الواجهة الرئيسية
  "components/HeroSection.tsx"
  "components/SmartAmbassador.tsx"
  
  # ملفات الإعدادات
  "src/config/knowledgeBase.ts"
  "src/config/landingPageConfig.ts"
)
# ----------------------------------------------------

# (بقية السكربت تبقى كما هي - لا حاجة لتغييرها)

print_header() {
  echo "
##############################################################################
# $1
##############################################################################
" >> "$OUTPUT_FILE"
}

summarize_file() {
  local file_path=$1
  if [ -f "$file_path" ]; then
    echo "
=======================================
الملف: $file_path
=======================================
" >> "$OUTPUT_FILE"
    echo "--------- (أول 20 سطرًا) ---------" >> "$OUTPUT_FILE"
    head -n 20 "$file_path" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--------- (آخر 20 سطرًا) ----------" >> "$OUTPUT_FILE"
    tail -n 20 "$file_path" >> "$OUTPUT_FILE"
  fi
}

if ! command -v jq &> /dev/null; then
    sudo apt-get update > /dev/null 2>&1 && sudo apt-get install -y jq > /dev/null 2>&1
fi
if ! command -v tree &> /dev/null; then
    sudo apt-get update > /dev/null 2>&1 && sudo apt-get install -y tree > /dev/null 2>&1
fi

rm -f "$OUTPUT_FILE"
echo "تقرير تعريف مشروع صفحة هبوط aiuncode.com - تم إنشاؤه في: $(date)" > "$OUTPUT_FILE"
echo "==============================================================" >> "$OUTPUT_FILE"

print_header "هيكل المشروع (بعمق 5 مستويات)"
tree -L 5 -I "node_modules|.git|.next|dist|build" >> "$OUTPUT_FILE"

print_header "المكتبات المستخدمة (من package.json)"
if [ -f "package.json" ]; then
  echo "Dependencies:" >> "$OUTPUT_FILE"
  jq .dependencies package.json >> "$OUTPUT_FILE" 2>/dev/null
  echo "" >> "$OUTPUT_FILE"
  echo "DevDependencies:" >> "$OUTPUT_FILE"
  jq .devDependencies package.json >> "$OUTPUT_FILE" 2>/dev/null
fi

print_header "ملخص محتويات الملفات الهامة"
for file in "${IMPORTANT_FILES[@]}"; do
  summarize_file "$file"
done

echo "
##############################################################################
# انتهى التقرير
##############################################################################
" >> "$OUTPUT_FILE"

echo "اكتمل إنشاء بطاقة التعريف بنجاح! الملف الناتج هو: $OUTPUT_FILE"
