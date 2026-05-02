// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY')
    }

    const { name, email, message, company, jobTitle, linkedin } = await req.json()

    if (!name || !email || !message) {
      throw new Error('Missing required fields')
    }

    const subject = jobTitle 
      ? `New Job Application: ${jobTitle} from ${name}`
      : `New Contact Inquiry from ${name}`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>', // Change to your verified domain when going to production
        to: ['iniondatasolutions@gmail.com'], // Using the registered Resend email address
        subject: subject,
        html: `
          <h2>${jobTitle ? 'New Job Application' : 'New Contact Inquiry'}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${jobTitle ? `<p><strong>Applying for:</strong> ${jobTitle}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${linkedin ? `<p><strong>LinkedIn/Portfolio:</strong> ${linkedin}</p>` : ''}
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: res.ok ? 200 : 400,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
