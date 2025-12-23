export function MapEmbed() {
    return (
        <section id="location" className="h-full w-full">
            <div className="h-full w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Find Us</h2>
                <div className="h-full w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835123456789!2d144.963057!3d-37.813629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0f0f0%3A0x123456789abcdef!2sGlen%20Waverley%2C%20VIC!5e0!3m2!1sen!2sau!4v1700000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
