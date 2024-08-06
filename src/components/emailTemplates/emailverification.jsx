// import * as React from 'react';

// export const VerifyEmailTemplate = ({
//   firstName,
//   verificationCode,
// }) => (
//   <div className='flex flex-col justify-center items-center'>

//     <div className='flex items-center' style={{ display: 'flex', alignItems: 'center' }}>
//       <img src="https://task-manager.nileshgosavi.tech/logo1.png" alt="logo " className="w-7 h-7 m-2" style={{width: "30px", height: "30px"}} />
//       <h1 className="mt-1 text-black text-2xl font-poppins font-bold">Task Master</h1>
//     </div>
//     <h2 className='text-black text-xl font-roboto'>Welcome to Task Master</h2>
//     <h1 className='text-black text-4xl'>Hello, {firstName}!</h1>
//     <p className='text-black'>Thank you for signing up. Here is your verification code: <h2 className='font-bold text-xl'>{verificationCode}</h2></p>
//     
//     <small className='text-black'> This code will expire in 1 hour</small>
//   </div>
// );

import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";



export const VerifyEmailTemplate = ({ firstName, verificationCode }) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Row>
          <Img
            src={`https://task-manager.nileshgosavi.tech/logo1.png`}
            width="36"
            height="36"
            alt="logo"
          />
          <Text style={h1}>Task Master</Text>
          </Row>
        </Section>
        <Heading style={h1}>Hey {firstName},</Heading>
        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>
          Your confirmation code is below - enter it in your open browser window
          and we'll help you get signed in.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{verificationCode}</Text>
        </Section>

        <Text style={text}>
          If you didn't request this email, there's nothing to worry about, you
          can safely ignore it.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "66%" }}>
              <Img
                src={`https://task-manager.nileshgosavi.tech/logo1.png`}
                width="36"
                height="36"
                alt="logo"
              />
            </Column>
            <Text style={footerText}><Link href="https://task-manager.nileshgosavi.tech/verify">Click here</Link> to enter the verification code in your browser</Text>
          </Row>
        </Section>

       
      </Container>
    </Body>
  </Html>
);

export default VerifyEmailTemplate;

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left",
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center",
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
