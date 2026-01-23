import React from 'react'

const ContactUs = () => {
    return (
        <div>
            <div className='container mt-5'>
                <div className="row justify-content-center">

                    <div className="col-4">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="enter name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                        </div>
                         <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="number" className="form-control" id="email" placeholder="1233" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input type="text" className="form-control" id="subject" placeholder="subject" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Your message</label>
                            <textarea className="form-control" id="message" rows="3"></textarea>
                        </div>
                         <button className="btn btn-warning">
                        Send Message
                    </button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default ContactUs