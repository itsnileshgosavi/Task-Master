import { ResetPwdTemplate } from '@/components/emailTemplates/reset-email-template';
import { Resend } from 'resend';
import { connectDb } from '@/helper/db';
import { NextResponse } from 'next/server';
import { User } from '@/models/user';
import { Verifications } from '@/models/verifications';

const resend = new Resend(process.env.RESEND_SECRET);

export async function POST(req) {
  try {
    const verificationCode = Math.floor(1000 + Math.random() * 9000); // generate a random 4-digit verification code
    const { email } = await req.json();
    await connectDb();
    
    const user = await User.findOne({ email: email });
    if(!user){
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const name = user.name;
    const ver = await Verifications.findOne({ email: email });
    if (ver) {
        return NextResponse.json({ error: 'Verification code already sent' }, { status: 400 });
    }else{

       const x= await Verifications.create({ email, verificationCode }); // store the verification code in the database
       
    }
    console.log(ver);
    if (!ver){
        const { data, error } = await resend.emails.send({  // send the email with the verification code
            from: 'TaskMaster <noreply@task.manager.nileshgosavi.tech>',
            to: [email],
            subject: 'Reset Password',
            react: ResetPwdTemplate({ firstName: name, verificationCode: verificationCode }),
          });
    }

    return NextResponse.json({ message: 'Verification code sent successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
