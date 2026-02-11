import React from "react";

// Fonts via CSS
const fontStyles = `
@font-face { font-family: Nunito_regular; src: url('../assets/fonts/Nunito_regular.ttf'); }
@font-face { font-family: Nunito-Light; src: url('../assets/fonts/Nunito-Light.ttf'); }
@font-face { font-family: Nunito-Semibold; src: url('../assets/fonts/Nunito-Light.ttf'); }
@font-face { font-family: Questrial-Regular; src: url('../assets/fonts/Questrial-Regular.ttf'); }
@font-face { font-family: RedhatR; src: url('../assets/fonts/RedhatR.ttf'); }
@font-face { font-family: Rubik-Medium; src: url('../assets/fonts/Rubik-Medium.ttf'); }
@font-face { font-family: Montserrat-Medium; src: url('../assets/fonts/Montserrat-Medium.ttf'); }
@font-face { font-family: Rubik-Regular; src: url('../assets/fonts/Rubik-Regular.ttf'); }
`;

const TermsAndConditions = () => {
  const containerStyle = {
    padding: "30px",
    fontFamily: "RedhatR",
  };

  const titleStyle = {
    fontSize: "30px",
    textAlign: "center",
    fontFamily: "Nunito-Semibold",
  };

  const paragraphStyle = {
    fontSize: "16px",
    fontFamily: "RedhatR",
    lineHeight: "1.6",
  };

  return (
    <div className="col-md-12" style={containerStyle}>
      <p style={titleStyle}>TERMS AND CONDITIONS</p>
      <p style={paragraphStyle}>
        Welcome to our website. If you continue to browse and use this website,
        you are agreeing to comply with and be bound by the following terms and
        conditions of use, which together with our privacy policy govern Macmer
        Web Solution’s relationship with you in relation to this website. If you
        disagree with any part of these terms and conditions, please do not use
        our website.
        <br />
        The term Macmer Web Solutions or ‘us’ or ‘we’ refers to the owner of the
        website whose office is Prem Niwas Airport Road, Shivnagar Totu Shimla-11.
        The term ‘you’ refers to the user or viewer of our website. The use of
        this website is subject to the following terms of use:
        <br />
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
          “Any personal data collected will be used by (Macmer Web Solutions) to
          contact you via phone, SMS or email for marketing and to deliver certain
          updates for services or information you have requested.”
        </p>
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
          "By Using this website you agree that the contact numbers you provided
          are correct and the person owning the Contact number has given you the
          consent of receiving the Transactional SMS 24 X 7"
        </p>
        • The content of the pages of this website is for your general information
        and use only. It is subject to change without notice.
        <br />
        • This website uses cookies to monitor browsing preferences. If you do
        allow cookies to be used, the following personal information may be stored
        by us for use by third parties: Contact Numbers
        <br />
        • Neither we nor any third parties provide any warranty or guarantee as to
        the accuracy, timeliness, performance, completeness or suitability of the
        information and materials found or offered on this website for any
        particular purpose. You acknowledge that such information and materials
        may contain inaccuracies or errors and we expressly exclude liability for
        any such inaccuracies or errors to the fullest extent permitted by law.
        <br />
        • Your use of any information or materials on this website is entirely at
        your own risk, for which we shall not be liable. It shall be your own
        responsibility to ensure that any products, services or information
        available through this website meet your specific requirements.
        <br />
        • This website contains material which is owned by or licensed to us. This
        material includes, but is not limited to, the design, layout, look,
        appearance and graphics. Reproduction is prohibited other than in
        accordance with the copyright notice, which forms part of these terms and
        conditions.
        <br />
        • All trademarks reproduced in this website, which are not the property of,
        or licensed to the operator, are acknowledged on the website.
        <br />
        • Unauthorised use of this website may give rise to a claim for damages
        and/or be a criminal offence.
        <br />
        • From time to time, this website may also include links to other websites.
        These links are provided for your convenience to provide further information.
        They do not signify that we endorse the website(s). We have no responsibility
        for the content of the linked website(s).
        <br />
        • Your use of this website and any dispute arising out of such use of the
        website is subject to the laws of Himachal Pradesh High Court.
        <br />
      </p>
    </div>
  );
};

export default TermsAndConditions;
