
const htmlForMailService = () => {
  const htmlActivationMail = (link, name) => {
    const emailBody = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #1d1d1d;
              color: #fff;
              padding: 10px 20px;
            }
            .centered-block {
              text-align: center;
              padding: 30px 15px 55px;
              background-color: #303030
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              padding-bottom: 20px;
              color: #fff;
            }
            .button {
              text-decoration: none;
              color: #fff;
              background-color: #e00027;
              padding: 12px 80px;
              border-radius: 6px;
              font-size: 16px;
            }
            .footer {
              background-color: #1d1d1d;
              padding: 15px 20px;
              font-size: 12px;
              color: #fff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Dear, ${name}</h1>
            </div>
            <div class="centered-block">
              <h2 class="title">
                Click the button to activate your e-mail in the OnlineStore
              </h2>
              <a href="${link}" class="button">
                Activate
              </a>
            </div>
            <div class="footer">
              <p>
                This message has been sent automatically.
                Please do not reply to him.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    return emailBody;
  };
  const htmlResetPasswordMail = (link, name) => {
    const emailBody = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #1d1d1d;
              color: #fff;
              padding: 10px 20px;
            }
            .centered-block {
              text-align: center;
              padding: 30px 15px 55px;
              background-color: #303030
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              padding-bottom: 20px;
              color: #fff;
            }
            .button {
              text-decoration: none;
              color: #fff;
              background-color: #e00027;
              padding: 12px 80px;
              border-radius: 6px;
              font-size: 16px;
            }
            .footer {
              background-color: #1d1d1d;
              padding: 15px 20px;
              font-size: 12px;
              color: #fff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Dear, ${name}</h1>
            </div>
            <div class="centered-block">
              <h2 class="title">
              To reset your password on the OnlineStore website, please click on the button below:
              </h2>
              <a href="${link}" class="button">
                Reset
              </a>
            </div>
            <div class="footer">
              <p>
                This message has been sent automatically.
                Please do not reply to him.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    return emailBody;
  };

  return {
    htmlActivationMail,
    htmlResetPasswordMail,
  };
};

module.exports = htmlForMailService();
