import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/678e64553a8427326071b534/1ii23frsa'; // Your Tawk.to widget script URL
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script tag to the document body
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkToChat;
