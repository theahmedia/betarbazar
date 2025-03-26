import { useEffect } from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";

const CustomChatButton = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/678e64553a8427326071b534/1ii23frsa"; // Replace with your Tawk.to widget ID
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Wait for the widget to load, then hide the default button
    setTimeout(() => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    }, 5000); // Delay ensures the widget is fully loaded before hiding
  }, []);

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
    }
  };

  return (
    <button
      onClick={openChat}
      className="fixed bottom-5 right-5 z-50 bg-transparent"
    >
      <HiMiniChatBubbleLeftRight className="w-16 h-16 cursor-pointer transition-transform transform hover:scale-110"
      />
    </button>
  );
};

export default CustomChatButton;




// import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
{/* <HiMiniChatBubbleLeftRight className="w-16 h-16 cursor-pointer transition-transform transform hover:scale-110" /> */}