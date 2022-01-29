import s from './Header.module.css';

const Header = () => {
    return (
        <div className={s.header}>
            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" className={s.logo} />
        </div>
    );
}

export default Header;