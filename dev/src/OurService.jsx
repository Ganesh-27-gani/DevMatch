import React from "react";

const OurService = () => {
    return (
        <>
            <div style={{ background: "#161515fb" }}>
                <div className=" mb-2" style={{ padding: "30px" }}>
                    <h2 className="text-center text-light mb-3 ">Our Services</h2>

                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 "
                                style={{ background: "linear-gradient(135deg, #938e8e2b, #666669)", borderRadius: "16px" }}  >
                                <div className="card-body text-center ">
                                    <h5 className="card-title fw-bold mb-3 text-light ">
                                        Digital Marketing
                                    </h5>
                                    <p className="card-text mb-4 text-white ">
                                        Social media marketing, brand promotion & online growth.
                                    </p>
                                    <button
                                        className="btn text-white px-4 py-2"
                                        style={{ background: "linear-gradient(135deg, #a7a7af, #c9c8cc)", borderRadius: "30px" }}>Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0"
                                style={{ background: "linear-gradient(135deg, #938e8e2b, #666669)", borderRadius: "16px" }}  >
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold mb-3 text-white">
                                        Social Media Ads
                                    </h5>
                                    <p className="card-text text-white mb-4 ">
                                        Facebook, Instagram & Google paid ad campaigns.
                                    </p>
                                    <button
                                        className="btn text-white px-4 py-2"
                                        style={{ background: "linear-gradient(135deg, #a7a7af, #c9c8cc)", borderRadius: "30px" }}>Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0"
                                style={{ background: "linear-gradient(135deg, #938e8e2b, #666669)", borderRadius: "16px" }}  >
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold mb-3 text-white">
                                        Website Development
                                    </h5>
                                    <p className="card-text text-white mb-4">
                                        Business websites, portfolios & custom web applications.
                                    </p>
                                    <button
                                        className="btn text-white px-4 py-2"
                                        style={{ background: "linear-gradient(135deg, #a7a7af, #c9c8cc)", borderRadius: "30px" }}>Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0"
                                style={{ background: "linear-gradient(135deg, #938e8e2b, #666669)", borderRadius: "16px" }}  >
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold mb-3 text-white">
                                        SEO Optimization
                                    </h5>
                                    <p className="card-text text-white mb-4">
                                        Improve Google ranking & organic website traffic.
                                    </p>
                                    <button
                                        className="btn text-white px-4 py-2"
                                        style={{ background: "linear-gradient(135deg, #a7a7af, #c9c8cc)", borderRadius: "30px" }}>Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0"
                                style={{ background: "linear-gradient(135deg, #938e8e2b, #666669)", borderRadius: "16px" }}  >
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold mb-3 text-white">
                                        E-Commerce Solutions
                                    </h5>
                                    <p className="card-text text-white mb-4">
                                        Online stores with payment & product management.
                                    </p>
                                    <button
                                        className="btn text-white px-4 py-2"
                                        style={{ background: "linear-gradient(135deg, #a7a7af, #c9c8cc)", borderRadius: "30px" }}>Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0"
                                style={{ background: "linear-gradient(135deg, #938e8e2b, #666669)", borderRadius: "16px" }}  >
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold mb-3 text-white">
                                        UI / UX Design                                    </h5>
                                    <p className="card-text text-white mb-4">
                                        Modern, user-friendly and responsive designs.
                                    </p>
                                    <button
                                        className="btn text-white px-4 py-2"
                                        style={{ background: "linear-gradient(135deg, #a7a7af, #c9c8cc)", borderRadius: "30px" }}>Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurService;
