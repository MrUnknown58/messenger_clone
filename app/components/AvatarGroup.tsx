"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);
  const placeholderImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAC0CAMAAADvjTNsAAAAMFBMVEXh4eGjo6OgoKDk5OSwsLDU1NTc3NympqadnZ29vb3Nzc2rq6u1tbXZ2dnDw8PKysoat2WOAAAE8UlEQVR4nO2dyXrrIAxGbUYzGL//2xbcJHUzmSGAyKezyuIu+K9kAUJSpwlBEARBEARBEAT5eqhnWoVYf3+Ni1+80I4xs8OY02IaVBClwrGZkPmG/82cGFLOxpbloOSiZ1nY1ntlqQhtyIOSq32Md7eB4PbRKEfzWN57hbH4b0W+kbLLkf7b6b3OKLh9r+SXIYxDuTkxy8U4hsO3jY7TEtTo3ms9g8s4KQEJ29PomqDFq1khe5pI0uLVAN5wKIv8Xq4QBtc0LlGLV+N6r/kFNOXjvyKhBmibbBhvGtt71U+hW4ZhvGk2iKYRUaeYRyzAiEZ1lmG8aTRA06g8LfOseq/8AcpT95grhIELaHTL1OLVwAsBKl8MND+ja66XBT+Ddt6MvJI9FWOgXQXydsxfJLTkU/oZ82AaaKfNrxKTH8zghTORc2K+iQF2PEMxKKYFXxUAykIzMMt81T6Te88MSGhJ5286aNKCcOaDGbArQMFHA+6T8dfmXC3zDO7anH/VhHfRnL4q1RT9lvlgGJhvm3nxDGbmPDM/CzI7O+UdNqEdMq/Q1aSLMQBD2Q7V6c+AQJ3MQ9WSpmVRYLV4bJKaBWQkuyHmBE8jM7BL2T0ifuskBrgWf7GJPaMRBuwa8wS6Rj7UWqhB+QgV6qwQMJQCKnA3sqfQaTtzNcK2MbRMwdXeGsebZQQX+4Nb+byAlixyiPLMI1RwZx43HTIbx4fxsCNCK7l4Qrk2IeGXVGPVZ/+D0ok7G1obGLOOj9rW8Ae90XslCIIgCIIgCIIgyOj8u2IOfN8MqxZ8c8oyI0OShszSMKvcxsVIisKYCb4pSfaEDPmfMwupGiLVxtcRkhti1YqFBNO77GxIOjGlV8hpJ+9Xytxb42WO1v9D400ET1BwLe2YJHFC/gQRyZwG5XJeyab+z/5IEERmpjavp7eKgI9a4SvJU3LVE76g/mNP9vSrTHmVfaFnlnv6tqsYrkymez2aZzaq41sH1bagZvYZ0naq2KArK3eve3w06PCoRsXb0TIFcpbWxbRUOJJYJhPPQloOpaGTzm9kjIEw3SywCff5j+VOzdyo14Hykl6ZaDm2RR0qjZ6SU6jG1I/SdDuvJfmQmuozHOhW+3M5qKlcV19S8Z9DTTXZoyVyqVn0XNDxk0fNPqHs3oV8qtVwl7TJ51KrvX5tsVneQ+xaRYxuLyVQpVVQlDTJ5kNUjVPa2jqUXcSYGn7Wycvq+Fn+lJwySI14VtK9XCSmRhtn8+3/oqXOIaDxIfNKpV2zR2yu1pPGWXsx9Vo5dEaHXBk159O61mJqNqQ3PtLUOcr8qamb/bvTwionzxJ6yoq11O9JW9ulmurcZI5Q8ZnHpVMtpEX2PLfxP1FLozEBLRK0LZKzFzXZA0CjtbQcFFpZTdt+1LrPGm2eMw5UPAtU3vefstUJ0aTKNfkUPld4o13mToUNIm2UQZSWjhP19GfPNqTrpLPQL/8xOaR3V30oCfiMHDI3fPx/KWdVL/88U4IUYkB0otNQp1UmJ0jpXWx2pVAOJCmBvWE+t0YTXlN9KDpl6ZVOC2FQik3v8d6WUoRGlq6FjGd4d1Nxxc2hpFlBc6979nEGZ0WoZJ8+Aak0+yWhC4M7Zc3Tl3ZprHJ8pE6N/T9dcO0lWcsu+J/K6VD8P5CQG5fmH3FhGrUZCEEQBEEQBEEQpDo/Mkw6GzCjrCQAAAAASUVORK5CYII=";

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image fill src={user?.image || placeholderImage} alt="Avatar" />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
