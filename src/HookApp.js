import { useEffect, useState } from "react";

function HookApp(props)
{
    // State
    const [name, setName] = useState('User')
    const [imageSrc, setImage] = useState('https://images.unsplash.com/photo-1622902116716-8dd7bec10584?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80');

    // UseEffect name digunakan untuk menangkap nilai terbaru dari name
    useEffect(
        () => {
            console.log('Started')
            document.title = "Profile " + name

            return () => {
                console.log('Finished');
            }
        },
        [name] // dependency in use effect
    )

    // UseEffect name digunakan untuk menangkap nilai terbaru dari image
    useEffect(
        () => {
            console.log('image ' + imageSrc)
        },
         [imageSrc]
    )

    // Menangkap nilai name dari textbox name
    function handleNameChange(e){
        console.log(e)
        setName(e.target.value);
    }

    // Menangkap nilai image dari textbox imageSrc
    function handleImgChange(e){
        console.log(e)
        setImage(e.target.value);
    }

    return (
        <div className="container">
            <h1 className="text-center">Image</h1>
            <div className="row">
                <div className="form-group mb-4">
                    <label className="mb-2">Name</label>
                    <input type="text" defaultValue={name} onChange={handleNameChange} className="form-control" />
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2">Image</label>
                    <input type="text" defaultValue={imageSrc} onChange={handleImgChange} className="form-control" />
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="card">
                        <img src={imageSrc} alt="face" className="card-img-top" />
                        <div className="card-body">
                            <div className="card-title">
                                {/* Menangkap nilai dari state */}
                                Profile {name}
                                {/* Menangkap nilai dari pops */}
                                {/* Profile {props.name} */}
                            </div>
                            <div className="card-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ex facilis veniam. 
                                Minus illum aliquam quis vitae magni sed expedita neque tempore suscipit 
                                quisquam, optio fuga! Excepturi magni ad quasi.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default HookApp;