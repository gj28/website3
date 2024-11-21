import { useState, useRef } from 'react';

const ReviewSection = () => {
  const reviews = [
    {
      name: 'Thinkwik',
      rating: 4.5,
      comment: 'Great experience working with this company, their IT solutions are top-notch!',
      companyLogo: '/static/thinkwik.jpg',
    },
    {
      name: 'SFS Webtech',
      rating: 4,
      comment: 'Excellent service, their team is highly professional and always delivers on time.',
      companyLogo: '/static/s4s.jpg',
    },
    {
      name: 'Appventurez',
      rating: 4,
      comment: 'Amazing support and reliable IT services. Highly recommended for any tech needs.',
      companyLogo: '/static/appv.png',
    },
    {
      name: 'Tridhya Tech ltd',
      rating: 3.5,
      comment: 'Fantastic IT solutions and great customer support. They really understand business needs.',
      companyLogo: '/static/tridhya.jpg',
    },
    {
      name: 'SIGN-IN SOLUTIONS INC',
      rating: 3.5,
      comment: 'Fast response times and excellent service. This company is a game changer in IT.',
      companyLogo: '/static/signso.jpg',
    },
    {
      name: 'Softinator',
      rating: 4.5,
      comment: 'Top-tier tech services! They are experts in what they do and always go the extra mile.',
      companyLogo: '/static/softi.jpg',
    },
    // {
    //   name: 'James Clark',
    //   rating: 4.5,
    //   comment: 'Reliable, efficient, and professional. I trust them for all my IT needs.',
    //   companyLogo: 'logo.png',
    // },
    // {
    //   name: 'Olivia Harris',
    //   rating: 3,
    //   comment: 'Great customer experience, and their tech solutions have really helped our business grow.',
    //   companyLogo: 'logo.png',
    // },
    // {
    //   name: 'Daniel Moore',
    //   rating: 5,
    //   comment: 'I’ve worked with several IT companies, but this one stands out for its expertise and reliability.',
    //   companyLogo: 'logo.png',
    // },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const cardWidth = 360; // Width of a card (adjust this based on your design)
    const offset = direction === 'left' ? -cardWidth : cardWidth;
    const newIndex = scrollIndex + (direction === 'left' ? -1 : 1);

    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: 'smooth',
      });
    }

    // Update the scroll index to limit the scroll bounds
    if (newIndex >= 0 && newIndex <= reviews.length - 3) {
      setScrollIndex(newIndex);
    }
  };




    // Function to generate star rating dynamically
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0 ? true : false;
        const emptyStars = 5 - Math.ceil(rating);
    
        return (
          <>
            {Array.from({ length: fullStars }).map((_, index) => (
              <span key={`full-${index}`} className="text-yellow-400">★</span>
            ))}
            {halfStar && <span className="text-yellow-400">☆</span>}
            {Array.from({ length: emptyStars }).map((_, index) => (
              <span key={`empty-${index}`} className="text-gray-400">★</span>
            ))}
          </>
        );
      };


  return (
    <div className="review  ml-[-50px] w-[220%] mt-[5px] h-[55vh] bg-tranparant backdrop-blur-sm rounded-[10px] shadow shadow-white py-6 px-1 lg:px-6 relative">
      <h2 className=" text-white text-3xl font-bold text-center mb-14">What Our Clients Are Saying</h2>

    
      <div className="flex items-center justify-between">
     
        <button
          className=" p-4 rounded-full  transition"
          onClick={() => handleScroll('left')}
        >
          <span className="text-2xl text-white">&lt;</span>
        </button>

       
        <div
          ref={scrollRef}
          className="h-auto flex overflow-x-auto gap-8 no-scrollbar transition-transform duration-300 ease-in-out item-contain"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-70 bg-black text-white rounded-lg shadow-lg  cursor-pointer transition"
            >
              <div className="cardsin w-[50vh] flex items-center justify-center mt-2 mb-4">
                <img
                  src={review.companyLogo}
                  alt="Company Logo"
                  className="w-16 h-10 obeject-contain "
                />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold">{review.name}</p>
               <div className="mt-2">{renderStars(review.rating)}</div>
                <p className="mt-4 text-white">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

     
        <button
          className=" p-4 rounded-full  transition"
          onClick={() => handleScroll('right')}
        >
          <span className="text-2xl text-white">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
