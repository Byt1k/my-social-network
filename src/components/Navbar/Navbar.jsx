import s from './Navbar.module.css';
import Menu from './Menu/Menu';
import Friends from './Friends/Friends';

const Navbar = () => {
    const imageAnna = {
        background: 'url(https://img.freepik.com/free-photo/portrait-of-confident-beautiful-brunette-woman-turning-face-at-camera-with-dreamy-look-white_1258-19144.jpg?size=626&ext=jpg) no-repeat center center / cover'
    }
    const imageMaria = {
        background: 'url(https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg?size=626&ext=jpg&ga=GA1.1.1517186578.1641859200) no-repeat center center / cover'
    }
    const imageMax = {
        background: 'url(https://image.shutterstock.com/image-photo/portrait-happy-fashionable-handsome-man-260nw-600200732.jpg) no-repeat center center / cover'
    }
    return (
        <div className={s.navbar}>
            <Menu />
            <Friends />
        </div >
    );
}

export default Navbar;