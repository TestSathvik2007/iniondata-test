const { createClient } = require('@supabase/supabase-js');
const supabase = createClient("https://wmwoaxdwrnhappozbhch.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtd29heGR3cm5oYXBwb3piaGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjI0MDYsImV4cCI6MjA5MjczODQwNn0.cX5ujaMd6ftJqyZ4_vC8DOU7dRfSe8i_lpSYeRjVu68");
async function test() {
  const { data, error } = await supabase.from('careers').select('*');
  console.log('Data:', data);
  console.log('Error:', error);
}
test();
