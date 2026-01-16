import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// التحقق فقط إذا لم نكن في وضع البناء أو إذا كانت القيم مفقودة فعلاً
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error("Supabase credentials are missing!")
  }
}

// إنشاء الكائن فقط إذا توفرت القيم، وإلا إرجاع كائن فارغ مؤقتاً للبناء
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : (null as any)
