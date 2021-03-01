import React from 'react';
import moment from 'moment';

const Footer = () => {
    return (
        <footer>
            Genshin Impact™ is a registered trademark of MiHoYo Co., Ltd.<br/>
            This website is not affiliated
            to official Genshin impact.<br/>
            Images and data ©MiHoYo Co., Ltd.<br/><br/>
            © {moment().format('Y')} Akarimichi Genshin impact utility.
        </footer>
    );
};

export default Footer;

