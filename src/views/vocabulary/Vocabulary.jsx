export default function Vocabulary() {
    const vocabularyList = [
      {
        title: "ENGLISH VOCABULARY",
        description: "1000 từ vựng tiếng Anh thông dụng nhất kèm ví dụ và phát âm",
        image: "/english-vocabulary.png",
        status: "Get Started",
      },
      {
        title: "INTERMEDIATE ENGLISH",
        description: "800 từ vựng tiếng Anh trung cấp nhất kèm ví dụ và phát âm",
        image: "/intermediate-english.png",
        status: "Get Started",
      },
      {
        title: "TOEIC",
        description: "600 từ vựng Toeic kèm ví dụ và phát âm",
        image: "/toeic-600.png",
        status: "Get Started",
      },
      {
        title: "TOEIC",
        description: "1200 từ vựng Toeic thông dụng kèm ví dụ và phát âm",
        image: "/toeic-1200.png",
        status: "Coming soon",
      },
      {
        title: "IELTS",
        description: "1700 từ vựng IELTS thông dụng kèm ví dụ và phát âm",
        image: "/ielts.png",
        status: "Coming soon",
      },
      {
        title: "PHRASAL VERBS Theory",
        description: "100 cụm động từ thông dụng nhất kèm ví dụ",
        image: "/phrasal-verbs.png",
        status: "Get Started",
      },
      {
        title: "Adjective Phrase",
        description: "100 cụm tính từ thông dụng nhất kèm ví dụ",
        image: "/adjective-phrase.png",
        status: "Get Started",
      },
      {
        title: "Culture vocabulary Oxford 3000",
        description: "3847 từ vựng Oxford kèm ví dụ và phát âm",
        image: "/culture-vocabulary.png",
        status: "Get Started",
      },
    ];
  
    // Tính số cột còn thiếu nếu số item không chia hết cho 4
    const columnsNeeded = 4 - (vocabularyList.length % 4);
  
    // Nếu chia hết cho 4 thì không cần thêm placeholder
    const placeholderCount = columnsNeeded === 4 ? 0 : columnsNeeded;
  
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Vocabulary</h2>
  
        <div className="grid grid-cols-4 gap-6">
          {/* Render tất cả các item */}
          {vocabularyList.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  className={`mt-4 px-4 py-2 rounded text-white ${
                    item.status === "Get Started" ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {item.status}
                </button>
              </div>
            </div>
          ))}
  
          {/* Thêm các placeholder rỗng (nếu cần) để đảm bảo đủ 4 ô trên một hàng */}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <div key={`placeholder-${i}`} className="bg-transparent"></div>
          ))}
        </div>
      </div>
    );
  }
  