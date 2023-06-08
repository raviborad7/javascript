import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import addAdventureStyles from '../../styles/addadventure.module.css';
import bootstrapStyles from '../../styles/bootstrap.module.css';
import Banner from "../../components/banner";
import NewsLetterService from "../../Services/NewsLetterService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react";
import NewAdventureService from "../../Services/NewAdventureService";

function Index() {

    const [imgfile, setImgFile] = useState([]);
    const [videofile, setVideoFile] = useState([])
    const [isshow, setIsShow] = useState(false)
    const [data, setData] = useState(
        {
            name: "",
            category: "",
            sub_category: "",
            reference: "",
            address: "",
            location: "",
            img_url: "",
            video_url: "",
            selfie_url: "",
        }
    )
    const [errorBorder, setErrorBorder] = useState({ border: '2px solid #ff5a5a' });
    const [adventureName, setAdventureName] = useState('Enter Name');

    // console.log(data);
    const previewImgFile = (event) => {
        let imgs = URL.createObjectURL(event.target.files[0]);
        setImgFile((imgfile) => [...imgfile, { imgs }]);
    }

    const previewVideoFile = (event) => {
        let videos = URL.createObjectURL(event.target.files[0]);
        setVideoFile((videofile) => [...videofile, { videos }]);
    }
    // const onHover = (e, index) => {
    //     e.preventDefault();
    //     setIsShow(true)
    // };

    const changeBackground = (index) => {
        // if (index !== -1) {
        //     imgfile.splice(index, 1);
        // }
    }

    const handleNewAdventure = async (e) => {

        let validType = true;

        if (data.address !== '') {

        }

        console.log('test', data)
        // e.preventDefault()
        // await NewAdventureService.SendNewAdventure({
        //     name: data.name,
        //     category: data.category,
        //     sub_category: data.sub_category,
        //     reference: data.reference,
        //     address: data.address,
        //     location: data.location,
        //     img_url: data.img_url,
        //     video_url: data.video_url,
        //     selfie_url: data.selfie_url
        // })
        //     .then((response) => {
        //         if (response.status_code === 200) {
        //             toast.success("NewsLetter Subscribe Successfull!", {
        //                 position: "top-right"
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         toast.error("Internal Server Error", {
        //             position: "top-right"
        //         })
        //     })
        // setData({ name: "", category: "", sub_category: "", reference: "", address: "", location: "", img_url: "", video_url: "", selfie_url: "" })
    }

    const nw = [
        {
            imgs: "profile-post.png"
        },
        {
            imgs: "profile-post.png"
        },
        {
            imgs: "profile-post.png"
        },
        {
            imgs: "profile-post.png"
        },
        {
            imgs: "profile-post.png"
        },
        {
            imgs: "profile-post.png"
        },
        {
            imgs: "profile-post.png"
        },
        {
            imgs: "profile-post.png"
        },
    ]

    return (
        <>
            {/* {/ {/ <!-- Header Start --> /} /} */}
            <Header />
            {/* {/ {/ <!-- Header End --> /} /} */}

            {/* <!-- Banner Section Start --> */}
            <Banner page='addadventure' />
            {/* <!-- Banner Section End --> */}

            {/* <!--  adventure information Section Start  --> */}
            <section className={`${addAdventureStyles['addadventure-wrapper']} ${bootstrapStyles['container-fluid']} ${bootstrapStyles['pb-60']}`}>
                <ToastContainer />

                <div className={`${bootstrapStyles['container']} ${bootstrapStyles['px-0']}`}>
                    <div className={`${bootstrapStyles['row']}`}>
                        <div className={`${bootstrapStyles['col-lg-12']} ${bootstrapStyles['col-md-12']} ${bootstrapStyles['col-sm-12']} ${bootstrapStyles['col-xs-12']} ${addAdventureStyles['full-width']} ${bootstrapStyles['text-center']} ${bootstrapStyles['pt-60']}`}>
                            <h3 className={`${bootstrapStyles['mb-5']} ${bootstrapStyles['heading_h3']} ${addAdventureStyles['heading_h3']}`}>Add Your Adventure</h3>
                        </div>
                    </div>
                </div>

                <div className={`${bootstrapStyles['container']} ${bootstrapStyles['px-0']}`} >
                    <div className={`${addAdventureStyles['ad-information']}`}>
                        <h4 className={`${addAdventureStyles['ad-information-text']}`}>Adventure Information</h4>
                        <div className={`${addAdventureStyles['add-info-form']}`}>
                            <div className={`${bootstrapStyles['row']}`}>
                                <div className={`${bootstrapStyles['col-md-6']}`} >
                                    <div className={`${bootstrapStyles['form-group']} test`} >
                                        <label className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`} htmlFor="adventurename" >Adventure name</label>
                                        <input type="text" placeholder="Enter name" id="adventurename" className={`${bootstrapStyles['form-control']} ${addAdventureStyles['ad-information-input']}`} name='name' value={data.name} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                                    </div>
                                    <div className={`${bootstrapStyles['form-group']}`}>
                                        <label className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`} htmlFor="SubCategory">Sub Category</label>
                                        <select defaultValue="Select Sub Category" id="SubCategory" className={`${bootstrapStyles['form-select']} ${addAdventureStyles['ad-information-input']} ${addAdventureStyles['ad-information-dropdown']}`} name='sub_category' value={data.sub_category} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}  >
                                            <option selected>Select Sub Category</option>
                                            <option value="One">One</option>
                                            <option value="Two">Two</option>
                                            <option value="Three">Three</option>
                                        </select>
                                    </div>
                                    <div className={`${bootstrapStyles['form-group']}`}>
                                        <label className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`} htmlFor="Referance">Referance</label>
                                        <input type="text" placeholder="Add your Referance" id="Referance" className={`${bootstrapStyles['form-control']} ${addAdventureStyles['ad-information-input']}`} name='reference' value={data.reference} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                                    </div>
                                </div>
                                <div className={`${bootstrapStyles['col-lg-6']}`} >
                                    <div className={`${bootstrapStyles['form-group']}`}>
                                        <label className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`} htmlFor="Category">Category</label>
                                        <select id="Category" className={`${bootstrapStyles['form-select']} ${addAdventureStyles['ad-information-input']} ${addAdventureStyles['ad-information-dropdown']}`} name='category' value={data.category} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} >
                                            <option selected>Select Category</option>
                                            <option value="One">One</option>
                                            <option value="Two">Two</option>
                                            <option value="Three">Three</option>
                                        </select>
                                    </div>
                                    <div className={`${bootstrapStyles['form-group']}`}>
                                        <label className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`} htmlFor="address">Address</label>
                                        <textarea rows="6" id="address" className={`${bootstrapStyles['form-control']} ${addAdventureStyles['ad-information-textarea']}`} placeholder="Enter Adventure Address" name='address' value={data.address} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className={`${bootstrapStyles['form-group']}`}>
                                <label className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`} htmlFor="GoogleMapLocation">Add Google Map Location</label>
                                <input type="text" id="GoogleMapLocation" className={`${bootstrapStyles['form-control']} ${addAdventureStyles['ad-information-input']}`} placeholder="Paste your google map link of adventure location" name='location' value={data.location} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className={`${addAdventureStyles['ad-information']} ${addAdventureStyles['verify-ad']} `} >
                        <h4 className={`${addAdventureStyles['ad-information-text']}`}>Verify Your Adventure</h4>
                        <div className={`${addAdventureStyles['add-info-form']}`} >
                            <lable className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`}> Add photo of adventure</lable>
                            <div className={`${addAdventureStyles['ad-photos']}`}  >
                                <div className={`${addAdventureStyles['col_left']}`}>
                                    <div className={`${addAdventureStyles['fileinputs']}`}>
                                        <input type="file" name="img" onChange={previewImgFile} className={`${addAdventureStyles['file']}`} />
                                        <div className={`${addAdventureStyles['inputfile_inner']}`}>
                                            <img src="/imguploadicon.png" />
                                            <p className={`${addAdventureStyles['imguploadfile_text']}`} >Select Photos</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${addAdventureStyles['col_right']}`}>
                                    <div className={`${bootstrapStyles['row']} ${bootstrapStyles['flex-wrap']}`}>
                                        {
                                            imgfile.map((item, index) => {
                                                return (
                                                    <div key={index} className={`${addAdventureStyles['uploaded_img_wrapper']}`}>
                                                        <img
                                                            onMouseOver={() => setIsShow(true)}
                                                            onMouseOut={() => setIsShow(false)}
                                                            src={item.imgs} alt="image" className={`${addAdventureStyles['img_uploaded']}`}
                                                            name='img_url' value={data.img_url} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                        />
                                                        {isshow ? <span className={`${addAdventureStyles['remove_text']}`} onClick={(index) => changeBackground(index)}>Remove Image</span> : ""}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <lable className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`}> Add Videos of Adventure</lable>
                            <div className={`${addAdventureStyles['ad-photos']}`}  >
                                <div className={`${addAdventureStyles['col_left']}`}>
                                    <div className={`${addAdventureStyles['fileinputs']}`}>
                                        <input type="file" onChange={previewVideoFile} className={`${addAdventureStyles['file']}`} />
                                        <div className={`${addAdventureStyles['inputfile_inner']}`}>
                                            <img src="/imguploadicon.png" />
                                            <p className={`${addAdventureStyles['imguploadfile_text']}`}>Select Video</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${addAdventureStyles['col_right']}`}>
                                    <div className={`${bootstrapStyles['row']} ${bootstrapStyles['flex-wrap']}`}>
                                        {
                                            videofile.map((item, index) => {
                                                return (
                                                    <div key={index} className={`${addAdventureStyles['uploaded_img_wrapper']}`}>
                                                        <img src={item.videos} alt="image" className={`${addAdventureStyles['img_uploaded']}`}
                                                            name='video_url' value={data.video_url} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <lable className={`${addAdventureStyles['form-label']} ${addAdventureStyles['ad-information-headingtext']}`}> Add your selfie</lable>
                            <div className={`${addAdventureStyles['ad-photos']}`}  >
                                <div className={`${addAdventureStyles['col_left']}`}>
                                    <div className={`${addAdventureStyles['fileinputs']}`}>
                                        <input type="file" className={`${addAdventureStyles['file']}`} />
                                        <div className={`${addAdventureStyles['inputfile_inner']}`}>
                                            <img src="selfieuploadicon.png" />
                                            <p className={`${addAdventureStyles['imguploadfile_text']}`}>Upload Selfie</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${addAdventureStyles['col_right']}`}>
                                    <div className={`${bootstrapStyles['row']} ${bootstrapStyles['flex-wrap']}`}>
                                        <div className={`${addAdventureStyles['uploaded_img_wrapper']}`}>
                                            <img src="profile-post.png" alt="image" className={`${addAdventureStyles['img_uploaded']}`}
                                                name='selfie_url' value={data.selfie_url} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className={`${addAdventureStyles['takeselfie_text']}`}>Open below link in your device to take a selfie</p>
                                <a href="javascript:void(0)" className={`${addAdventureStyles['takeselfie_linktext']}`} >https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjQnq3x0pb5AhViTWwGHfy2BYsQPAgI</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${bootstrapStyles['row']} ${addAdventureStyles['addyouradventure_btnwrapper']}`}>
                    <button className={`${addAdventureStyles['addyouradventure_cancelbtn']}`} >Cancel</button>
                    <button className={`${addAdventureStyles['addyouradventure_savebtn']}`} onClick={(e) => handleNewAdventure(e)} >Save</button>
                </div>
            </section>
            {/* <!--  adventure information Section End  --> */}

            {/* <!-- Footer Start --> */}
            <Footer />
            {/* <!-- Footer End --> */}
        </>
    )
}
export default Index



