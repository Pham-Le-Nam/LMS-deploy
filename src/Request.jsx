import React, {useState} from 'react';

import styles from './request.module.css';

import { Link } from 'react-router-dom';

import TopBar from './components/TopBar';
import CreditBox from './components/CreditBox';

import OptionsIcon from './assets/options-icon.png';

import LogoutIcon from './assets/logout-icon.png';
import HomeIcon from './assets/home-icon.png';
import ProfileIcon from './assets/profile-icon.png';
import RequestIcon from './assets/request-icon.png';
import CartIcon from './assets/cart-icon.png';

import { usePageLeft } from './components/PageLeftContext';
import { useRequest } from './components/RequestContext';
import { useHistories } from './components/HistoriesContext';


const BuyPages = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { histories, setHistories } = useHistories();
    const { pageLeft, setPageLeft } = usePageLeft();
    const { request, setRequest } = useRequest();

    const toggleTaskBar = () => {
        setIsCollapsed(!isCollapsed);
      };

    const print = (index, req) => {
        const newPaperLeft = pageLeft - req.totalPaper;

        if (newPaperLeft < 0){
            alert("Bạn Không Có Đủ Số Giấy Để In!");
            return;
        }
        addHistory(req);
        setPageLeft(newPaperLeft);
        remove(index);

        alert("Bạn Đã In Thành Công Một Yêu Cầu!");
    };

    const removeRequest = (index) => {
        remove(index);

        alert("Bạn Đã Xóa 1 Yêu Cầu!");
    };

    const remove = (index) => {
        setRequest(r => r.filter((_, i) => i != index));
    };

    const addHistory = (req) => {
        var today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        const newHistory = {date: today, printer: req.printer, copyNumber: req.copyNumber, totalPaper: req.totalPaper};

        setHistories([...histories, newHistory]);
    };

    return(
        <div className={styles.background}>
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
            </div>

            <div className={styles.requestContainer}>
                <CreditBox />

                <div className={styles.requestBox}>
                    <div className={styles.requestTitle}>
                        Yêu Cầu
                    </div>

                    {request.map((req, index) => (
                        <div className={styles.request}>
                            <div className={styles.requestDetail}>
                                {`Kích thước giấy: ${req.size}, Số mặt: ${req.sides}, Màu in: ${req.color},
                                Máy in: ${req.printer}, Số bản in: ${req.copyNumber}, Tổng Số Trang In: ${req.totalPaper}`}
                            </div>

                            <div className={styles.buttonContainer}>
                                <button onClick={() => print(index, req)} className={styles.printButton} >
                                    In
                                </button>

                                <button className={styles.removeButton} onClick={() => removeRequest(index)}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.requestBox}>
                    <div className={styles.requestTitle}>
                        Lịch Sử In
                    </div>

                    {histories.map((history) => (
                        <div className={styles.request}>
                            <div className={styles.historyDetail}>
                                Ngày: {history.date}
                            </div>

                            <div className={styles.historyDetail}>
                                Máy In: {history.printer}
                            </div>

                            <div className={styles.historyDetail}>
                                Số Bản In: {history.copyNumber}
                            </div>

                            <div className={styles.historyDetail}>
                                Tổng Giấy In: {history.totalPaper}
                            </div>

                            
                        </div>
                    ))

                    }

                </div>

            </div>

        </div>
    );
}

export default BuyPages;