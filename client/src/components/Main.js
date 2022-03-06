import { useState, useRef } from 'react'
import axios from 'axios'
import validator from 'validator'
import { nanoid } from 'nanoid';

import { StyledMain } from '../styles';

const Main = () => {

    const [fullUrl, setFullUrl] = useState(""); // state for the inputted fullUrl
    const [customUrl, setCustomUrl] = useState(""); // state for the custom shortUrl
    const [shortenUrlData, setShortenUrlData] = useState(""); // all data after the fullUrl is shortened
    const [error, setError] = useState(""); // error message
    const [blank, setBlank] = useState(false); // error message
    const copyLink = useRef(null); // ref for the copy link button
    const [linkCopied, setLinkCopied] = useState(false); // error message



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validLongUrl = validator.isURL(fullUrl, {
                require_protocol: true
            });

            if (!validLongUrl) {
                setBlank(true);
            } else {
                const res = await axios.post("/shorten", { fullUrl, shortUrl: customUrl ? customUrl : nanoid() });
                setShortenUrlData(res.data)
                setFullUrl("")
                setError("")
            }
        } catch (err) {
            setError(err.response.status)
        }
    }

    const shortenAgain = () => {
        setShortenUrlData("")
        setFullUrl("")
        setCustomUrl("")
        setLinkCopied(false)
    }

    const handleFullURL = (e) => {
        setFullUrl(e.target.value)
        setBlank(false)
    }

    const handleshortURL = (e) => {
        setCustomUrl(e.target.value)
        setError("")
    }

    const copyShortLink = (e) => {
        copyLink.current?.select();
        setBlank(false)
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
                    <p>A not so short URL Shortener but free.</p>
                    <h1><span>Try it with </span>JBShort</h1>
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
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

                        {blank &&
                            <p style={{ color: "red" }}>Please enter a valid URL (including "http/s")</p>
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
                                    process.env.NODE_ENV !== 'production' ? `http://localhost:8888/${shortenUrlData.shortUrl}` : `https://jbshort.herokuapp.com/${shortenUrlData.shortUrl}`
                                } readOnly ref={copyLink} />
                                <div className='copy__url' onClick={copyShortLink}>Copy</div>
                            </div>
                            :
                            <input className='input__url' type="text" value={customUrl} onChange={handleshortURL} placeholder='Custom url' />
                        }
                        {error === 409 &&
                            <p style={{ color: "red" }}>Your custom URL is already taken. Try a new one.</p>
                        }
                        {linkCopied &&
                            <p style={{ color: "green" }}>Copied</p>
                        }

                        {shortenUrlData ?
                            <button onClick={shortenAgain}>Shorten another URL</button>
                            :
                            <button>Shorten</button>
                        }
                    </form>
                </div>
            </section>
        </StyledMain>
    );
}

export default Main;


