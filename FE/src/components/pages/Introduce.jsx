import 'aos/dist/aos.css';
import BannerSlide from '../UI/organisms/BannerSlide';
import { useEffect } from 'react';
import { css } from '@emotion/react';
import AOS from 'aos';
import one from './OnBoarding/images/one.svg';
import two from './OnBoarding/images/two.svg';
import three from './OnBoarding/images/three.svg';
import four from './OnBoarding/images/four.svg';
import blockchain from './OnBoarding/images/blockchain.svg';
import donation from './OnBoarding/images/donation.svg';
import ocr from './OnBoarding/images/ocr.svg';
import withdraw from './OnBoarding/images/withdraw.svg';
import exshelter from './OnBoarding/images/exshelter.svg';
import exproject from './OnBoarding/images/exproject.svg';
import exshelter2 from './OnBoarding/images/exshelter2.svg';
import ocr1 from './OnBoarding/images/ocr1.svg';
import ocr2 from './OnBoarding/images/ocr2.svg';
import ocr3 from './OnBoarding/images/ocr3.svg';

/** @jsxImportSource @emotion/react */

const SectionContainer = css`
  padding: 0 40px;
`;

const SectionSubContainer = css`
  width: 100%;
  max-width: 1064px;
  padding: 0px;
  margin: 0px auto;
`;

const numberContainer = css`
  position: relative;

  img:last-of-type {
    position: absolute;
    left: 64%;
    top: 10%;
    background: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0);
    border-radius: 100%;
    width: 26%;
  }
`;

// Section 2
const campaignSection = css`
  display: flex;
  margin-top: 100px;
  padding-right: 40px;
  margin-bottom: 130px;

  > div {
    width: 50%;
  }
`;

const senagiContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

const writingContainer = css`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding-left: 40px;

  h2 {
    font-size: 65px;
    line-height: 1;
    margin-bottom: 25px;
  }

  p {
    color: #36b536;
    font-size: 23px;
    font-weight: 500;
    margin-top: 0;
  }
`;

const ocrBackground = css`
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 24px;
  background: linear-gradient(135deg, rgb(255, 200, 143) 0%, rgb(255, 143, 143) 100%);
  border-radius: 20px;
  margin: 10px 10px 10px 0;
`;

const blockchainBackground = css`
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 24px;
  background: linear-gradient(135deg, rgb(202, 236, 172) 0%, rgb(131, 208, 197) 100%);
  border-radius: 20px;
  margin: 10px 10px 10px 0;
`;

const withdrawBackground = css`
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 24px;
  background: linear-gradient(135deg, rgb(255, 232, 188) 0%, rgb(255, 156, 84) 100%);
  border-radius: 20px;
  margin: 10px;
`;

const donationBackground = css`
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 24px;
  background: linear-gradient(135deg, rgb(255, 239, 184) 0%, rgb(251, 220, 113) 100%);
  border-radius: 20px;
  margin: 10px;
`;

// Section 3
const shelterBackground = css`
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 24px;
  background: linear-gradient(135deg, rgb(218, 227, 244) 0%, rgb(146, 163, 195) 100%);
  border-radius: 20px;
`;

const whiteBackgrounds = css`
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 24px;
  border-radius: 20px;
  background: white;
`;

const verticalContainer = css`
  padding-left: 60px;
`;

const verticalImage2 = css`
  margin-left: 20%;
  margin-top: -21%;
`;

const verticalImage3 = css`
  margin-left: 45%;
  margin-top: -21%;
`;

// Section 4
const receiptBackground = css`
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 24px;
  background: linear-gradient(135deg, rgb(255, 228, 184) 0%, rgb(255, 200, 109) 100%);
  border-radius: 20px;
`;

const verticalImageLeft2 = css`
  margin-left: 23%;
  margin-top: -23%;
`;

const verticalImageLeft3 = css`
  margin-left: 43%;
  margin-top: -23%;
`;

// Section 5

const writingContainerReversed = css`
  display: flex;
  flex-wrap: wrap;
  align-content: center;

  h2 {
    font-size: 60px;
    line-height: 1;
    margin-bottom: 25px;
  }

  p {
    color: #36b536;
    font-size: 22px;
    font-weight: 500;
    margin-top: 0;
  }
`;

function Introduce() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <BannerSlide />
      {/* Section 2 */}
      <div css={SectionContainer}>
        <div css={SectionSubContainer}>
          <section id="about" css={campaignSection}>
            <div css={senagiContainer}>
              <div data-aos="zoom-in" data-aos-duration="900" css={numberContainer}>
                <img css={blockchainBackground} src={blockchain} alt="blockchain Background" />
                <img src={one} alt="one" />
              </div>
              <div data-aos="zoom-in" data-aos-duration="1300" css={numberContainer}>
                <img css={donationBackground} src={donation} alt="donation Background" />
                <img src={two} alt="two" />
              </div>
              <div data-aos="zoom-in" data-aos-duration="1600" css={numberContainer}>
                <img css={ocrBackground} src={ocr} alt="ocr Background" />
                <img src={three} alt="three" />
              </div>
              <div data-aos="zoom-in" data-aos-duration="1900" css={numberContainer}>
                <img css={withdrawBackground} src={withdraw} alt="withdraw Background" />
                <img src={four} alt="four" />
              </div>
            </div>
            <div css={writingContainer}>
              <h2>?????????????</h2>
              <p>
                ????????? ?????? ????????? ?????? ?????? ?????? ?????? ???????????? ?????? ???????????? ????????????. ?????? ?????????
                ????????? ???????????? ???????????????!
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section css={campaignSection}>
            <div css={writingContainerReversed}>
              <h2>????????? ??????</h2>
              <p>
                ?????? ????????? ????????? ??????, ???????????? ???????????? ???????????? ????????? ?????? ????????????. ???????????????
                ?????? ?????? ????????? ?????? ????????? ???????????? ????????????.
              </p>
            </div>

            <div css={verticalContainer}>
              <div>
                <img css={shelterBackground} src={exshelter} alt="shelter Background" />
              </div>
              <div data-aos="fade-up" data-aos-duration="1500" css={verticalImage2}>
                <img css={whiteBackgrounds} src={exproject} alt="project" />
              </div>
              <div data-aos="fade-up" data-aos-duration="1500" css={verticalImage3}>
                <img css={whiteBackgrounds} src={exshelter2} alt="shelter" />
              </div>
            </div>
          </section>

          {/* Section 4*/}
          <section css={campaignSection}>
            <div>
              <div>
                <img css={receiptBackground} src={ocr1} alt="receipt Background" />
              </div>
              <div data-aos="fade-up" data-aos-duration="1500" css={verticalImageLeft2}>
                <img css={whiteBackgrounds} src={ocr2} alt="ocr" />
              </div>
              <div data-aos="fade-up" data-aos-duration="1500" css={verticalImageLeft3}>
                <img css={whiteBackgrounds} src={ocr3} alt="withdraw" />
              </div>
            </div>

            <div css={writingContainer}>
              <h2>????????? ?????? ??? ????????? ??????</h2>
              <p>
                ????????? OCR??? ???????????? ????????? ??????????????? ???????????? ?????? ????????? ????????????, ?????? ??????
                ?????? ?????? ???????????? ????????? ???????????? ?????? ????????? ???????????? ???????????? ???????????????.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default Introduce;
