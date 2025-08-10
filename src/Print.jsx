import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { useUser } from './components/UserContext';

import TopBar from "./components/TopBar.jsx";
import DropdownMenu from "./components/DropdownMenu.jsx";
import CreditBox from './components/CreditBox.jsx';
import NormalMenu from "./components/normalmenu.jsx";
import FileUpload from "./components/FileUpload.jsx";

import styles from './print.module.css';

import LogoutIcon from './assets/logout-icon.png';
import HomeIcon from './assets/home-icon.png';
import DashboardIcon from './assets/dashboard-icon.png';
import ProfileIcon from './assets/profile-icon.png';
import RequestIcon from './assets/request-icon.png';
import CartIcon from './assets/cart-icon.png';

import OptionsIcon from './assets/options-icon.png';

import { usePageLeft } from './components/PageLeftContext.jsx';
import { usePage } from './components/PageContext.jsx';
import { useRequest } from './components/RequestContext.jsx';

function Print() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [paperSize, setPaperSize] = useState("A4");
    const [printSides, setPrintSides] = useState(1);
    const [printColor, setPrintColor] = useState(0);
    const [printer, setPrinter] = useState("001 202-A4");
    const [value, setValue] = useState(0);

    const { user } = useUser();
    const { pageLeft } = usePageLeft();
    const { page } = usePage();
    const { request, setRequest } = useRequest();

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (newValue >= 0) {
            setValue(Number(newValue));
        }
    };
    
    const selectPaperSize = () => {
        setPaperSize(event.target.value);
    };

    const selectPrintSides = () => {
        setPrintSides(event.target.value);
    };

    const selectPrintColor = () => {
        setPrintColor(event.target.value);
    };

    const selectPrinter = () => {
        setPrinter(event.target.value);
    };

    const toggleTaskBar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const requestConfirm = () => {
        if (page <= 0) {
            alert("Bạn Chưa Chọn File In!!");
            return;
        }
        if (value === 0) {
            alert("Bạn Chưa Chọn Số Bản In!!");
            return;
        }

        let sizeNumber = 0;
        if (paperSize.localeCompare("A4") == 0){
            sizeNumber = 1;
        }
        if (paperSize.localeCompare("A5") == 0){
            sizeNumber = 0.5;
        }
        if (paperSize.localeCompare("A3") == 0){
            sizeNumber = 2;
        }
        if (paperSize.localeCompare("A2") == 0){
            sizeNumber = 4;
        }

        const paperPerCopy = Math.ceil((Number(page)/Number(printSides))*sizeNumber);
        const totalPaper = paperPerCopy * Number(value);

        const newRequest = {size: paperSize, sides: printSides,
                            color: printColor, printer: printer,
                            copyNumber: value, totalPaper: totalPaper};
        
        setRequest([...request, newRequest]);

        alert(`Bạn Đã Xác Nhận Thành Công Yêu Cầu. Tổng Cộng ${totalPaper} Tờ Giấy.`);
    };

    return (
        <div className={styles.backimage}>
            <TopBar />

            <div className={isCollapsed ? styles.optionBoxCollapsed : styles.optionBox}>
        
                <button onClick={toggleTaskBar} className={styles.toggleButton}>
                    <img src={OptionsIcon} alt="options icon" className={styles.optionsIcon}/>
                </button>

                <p className={styles.optionItem}>
                    <img src={LogoutIcon} alt="logout icon" className={styles.icon}/>

                    {isCollapsed ? 
                    (
                        <></>
                    ):
                    (
                        <Link to="/login" className={styles.link}>
                        Đăng Xuất
                        </Link>
                    )
                    }
                </p>

                <p className={styles.optionItem}>
                    <img src={HomeIcon} alt="home icon" className={styles.icon}/>
                
                    {isCollapsed ? 
                    (
                        <></>
                    ):
                    (
                        <Link to="/home" className={styles.link}>
                        Trang Chủ
                        </Link>
                    )
                    }
                </p>

                {/* If the user is admin, only show Logout, Home, SPSO */}
                {/* If the user is student, show Logout, Home, Request, Cart, Profile, Print */}
                {user.role.localeCompare("Admin") == 0 ? 
                (
                <p className={styles.optionItem}>
                    <img src={DashboardIcon} alt="dashboard icon" className={styles.icon}/>

                    {isCollapsed ? 
                    (
                    <></>
                    ):
                    (
                    <Link to="/dashboard" className={styles.link}>
                        Dashboard
                    </Link>
                    )
                    }
                </p>
                ) : 
                (
                <div>
                    <p className={styles.optionItem}>
                    <img src={RequestIcon} alt="request icon" className={styles.icon}/>
                    
                    {isCollapsed ? 
                    (
                        <></>
                    ):
                    (
                        <Link to="/request" className={styles.link}>
                        Yêu Cầu
                        </Link>
                    )
                    }
                    </p>

                    <p className={styles.optionItem}>
                    <img src={CartIcon} alt="cart icon" className={styles.icon}/>
                    
                    {isCollapsed ? 
                    (
                        <></>
                    ):
                    (
                        <Link to="/buy-pages" className={styles.link}>
                            Mua Thêm Giấy In
                        </Link>
                    )
                    }
                    </p>

                    <p className={styles.optionItem}>
                    <img src={ProfileIcon} alt="profile icon" className={styles.icon}/>
                    
                    {isCollapsed ? 
                    (
                        <></>
                    ):
                    (
                        <Link to="/profile" className={styles.link}>
                        Thông Tin Cá Nhân
                        </Link>
                    )
                    }
                    </p>
                
                </div>
                )}
            </div>

            <div className={styles.printOptionContainer}>
                <CreditBox/>

                <div className={styles.dropdownContainer}>
                    <div className={styles.dropdownWrapper}>
                        <label className={styles.dropdownLabel}>Kích Thước Giấy</label>
                        <select value={paperSize} onChange={selectPaperSize} className={styles.options}>
                            <option value="A4">A4</option>
                            <option value="A5">A5</option>
                            <option value="A3">A3</option>
                            <option value="A2">A2</option>
                        </select>
                    </div>

                    <div className={styles.dropdownWrapper}>
                        <label className={styles.dropdownLabel}>Số Mặt In</label>
                        <select value={printSides} onChange={selectPrintSides} className={styles.options}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>

                    <div className={styles.dropdownWrapper}>
                        <label className={styles.dropdownLabel}>Màu In</label>
                        <select value={printColor} onChange={selectPrintColor} className={styles.options}>
                            <option value="Trắng Đen">Trắng Đen</option>
                            <option value="Màu">Màu</option>
                        </select>
                    </div>

                    <div className={styles.dropdownWrapper}>
                        <label className={styles.dropdownLabel}>Máy In</label>
                        <select value={printer} onChange={selectPrinter} className={styles.options}>
                            <option value="001 202-A4">001 202-A4</option>
                            <option value="002 304-B1">002 304-B1</option>
                            <option value="003 104-C5">003 104-C5</option>
                        </select>
                    </div>

                    <div className={styles.menuContainer}>
                        <label className={styles.menuLabel}>Nhập Số Bản In</label>
                        <input
                            type="number"
                            className={styles.menuInput}
                            value={value}
                            onChange={handleChange}
                        />
                    </div>
                    
                </div>

                <FileUpload />

                <button onClick={requestConfirm} className={styles.options}>
                    Xác Nhận
                </button>

                
            </div>
        </div>
    );
}

export default Print;