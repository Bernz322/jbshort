import { useState, useRef } from 'react'
import axios from 'axios'
import validator from 'validator'
import { customAlphabet } from 'nanoid';

import { StyledMain } from '../styles';
import { Loader } from "."

const Main = () => {

    const [fullUrl, setFullUrl] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [shortenUrlData, setShortenUrlData] = useState("");
    const [error, setError] = useState("");
    const [error2, setError2] = useState("");
    const copyLink = useRef(null);
    const [linkCopied, setLinkCopied] = useState(false);
    const [loader, setLoader] = useState(false); 
    const [disable, setDisable] = useState(false);
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv1234567890', 5)

    const handleSubmit = async () => {
        if (!fullUrl) return setError("Please input a link.");

        const validLongUrl = validator.isURL(fullUrl, {
            require_protocol: true
        });

        if (!validLongUrl) return setError("Please input a valid link.");

        setLoader(true)
        setDisable(true)
        try {
            const res = await axios.post("/shorten", { fullUrl, shortUrl: customUrl ? customUrl : nanoid() });
            console.log(res.data)
            console.log(res.data.fullUrl)
            console.log(fullUrl)
            if (res.data.fullUrl !== fullUrl) {
                setError2("Your inputted short URL is already taken. Please try another one.");
                setCustomUrl("")
            } else {
                setShortenUrlData(res.data)
                setError("")
                setError2("")
                setFullUrl("")
            }
            setDisable(false)
            setLoader(false)
        } catch (err) {
            setLoader(false)
            setError(err.response.status)
        }
    }

    const shortenAgain = () => {
        setShortenUrlData("")
        setFullUrl("")
        setCustomUrl("")
        setLinkCopied(false)
        setError("")
    }

    const handleFullURL = (e) => {
        setFullUrl(e.target.value)
    }

    const handleshortURL = (e) => {
        setCustomUrl(e.target.value)
        setError("")
    }

    const copyShortLink = (e) => {
        copyLink.current?.select();
        document.execCommand('copy');
        setLinkCopied(true)
    }

    return (
        <StyledMain
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 200 }
            }}>
            <section className="section">
                <div className="description">
                    <p>Free URL Shotener</p>
                    <h1><span>Try it with </span>JBShort</h1>
                </div>
                <div className="container">
                    <div>
                        <div className="desc__">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path></svg>
                            {shortenUrlData ?
                                <h3>Your Long URL</h3>
                                :
                                <h3>Enter your long URL</h3>
                            }
                        </div>
                        {shortenUrlData ?
                            <input className='input__url' type="text" value={shortenUrlData.fullUrl} readOnly />
                            :
                            <input className='input__url' type="text" value={fullUrl} onChange={handleFullURL} placeholder='Enter your url here' />
                        }

                        {error &&
                            <p style={{ color: "red" }}>{error}</p>
                        }

                        <div className="desc__">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                            {shortenUrlData ?
                                <h3>Your Short URL</h3>
                                :
                                <h3>Customize your link (Optional)</h3>
                            }
                        </div>
                        {shortenUrlData ?
                            <div className="short__url__input">
                                <input className='input__url__after' type="text" value={
                                    process.env.NODE_ENV !== 'production' ? `http://localhost:8888/${shortenUrlData.shortUrl}` : `https://jbshort.xyz/${shortenUrlData.shortUrl}`
                                } readOnly ref={copyLink} />
                                <div className='copy__url' onClick={copyShortLink}>Copy</div>
                            </div>
                            :
                            <input className='input__url' type="text" value={customUrl} onChange={handleshortURL} placeholder='Custom url' />
                        }
                        {error2 &&
                            <p style={{ color: "red" }}>{error2}</p>
                        }
                        {linkCopied &&
                            <p style={{ color: "green" }}>Copied</p>
                        }

                        {shortenUrlData ?
                            <button onClick={shortenAgain}>Shorten another URL</button>
                            :
                            <button onClick={handleSubmit} disabled={disable}> {loader ? <Loader /> : "Shorten"}</button>
                        }
                    </div>
                </div>
            </section>
        </StyledMain>
    );
}

export default Main;


