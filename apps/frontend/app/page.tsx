import { cn } from '@utils/cn';
import BoxReveal from '@components/box-reveal';
import DotPattern from '@components/dot-pattern';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';

export default async function IndexPage() {
  return (
    <>
      <main className="h-screen w-full flex">
        <div className="pl-12 my-auto">
          {/* /* <p>Yet another</p>
          <BoxReveal duration={0.5}>
            <p className="text-[3.5rem] font-semibold">SAAS</p>
          </BoxReveal>
          <BoxReveal duration={1}>
            <p className="text-[1.2rem]">
              I'm sure we will make more money than the next guy
            </p>
          </BoxReveal>
        </div>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            '[mask-image:linear-gradient(to_bottom_right,white,transparent)] '
          )}
        /> * */}
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <MainHero />
          </div>
          </div>
          <MainHeroImage />
        </div>
      </main>
    </>
  );
}
