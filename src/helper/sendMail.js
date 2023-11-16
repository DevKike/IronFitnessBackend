const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "ironfitness.enterprise@hotmail.com",
        pass: "ironfitness1516"
    }
});

const sendMail = async (emailInfo) => {
    console.log("🚀  ~ file: sendMail.js:14 ~ sendMail ~ emailInfo:", emailInfo);
    try {
        await transport.sendMail({
            from: emailInfo.from,
            to: emailInfo.to,
            subject: emailInfo.subject,
            html: emailInfo.html
        });
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { sendMail };