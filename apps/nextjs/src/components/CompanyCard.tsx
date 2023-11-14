import Image from "next/image";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useEffect, useMemo, useState } from "react";

interface IProps {
  company: {
    id: number;
    logo: string;
    name: string;
    ticker: string;
    createdAt: Date;
    updatedAt: Date;
  };
  sentiment?: {
    positive: number;
    negative: number;
    neutral: number;
    sentiment: number;
    total: number;
  };
}

interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  sentiment: number;
  total: number;
}

const initialState: SentimentStats = {
  positive: 0,
  negative: 0,
  neutral: 0,
  sentiment: 0,
  total: 0,
};

export default function CompanyCard({ company, sentiment }: IProps) {
  const { data: articles } = trpc.article.byCompanyId.useQuery(company.id);
  // For testing

  // const articles = useMemo(
  //   () => [
  //     {
  //       id: 4,
  //       company_id: 2,
  //       title:
  //         "<![CDATA[Cruise Robotaxis Were All Over San Francisco—and Poised to Go National. California Just Banned Them.]]>",
  //       link: "https://slate.com/business/2023/10/cruise-suspended-california-robotaxis-self-driving-cars-san-francisco.html?via=rss",
  //       keywords: [],
  //       video_url: "",
  //       description: "",
  //       content:
  //         "The robotaxi company Cruise has been revving up for rapid growth. In August, California regulators granted carte blanche to the outfit in San Francisco, where its CEO has envisioned deploying than the several hundred it operated this summer. Meanwhile, Cruise, which by General Motors, a dozen other U.S. cities including Austin, Charlotte, Houston, Raleigh, and Washington. California just forced Cruise to hit the brakes. On Tuesday, the state’s Department of Motor Vehicles suspended Cruise’s permits to deploy driverless vehicles statewide. The impact of that move will reverberate throughout the tech and car industries, and well beyond California. In , the California DMV cited “an unreasonable risk to public safety” posed by Cruise robotaxis. It is not hard to see how the DMV might arrive at that conclusion. For months, San Francisco police, fire, and transportation attention to a litany of from Cruise as well as its rival Waymo (a subsidiary of Alphabet, which also owns Google) involving blocked traffic, interrupted emergency responses, and hindered public transportation. In just the past few weeks, Cruise vehicles have , gotten , and who had been struck by a hit-and-run driver. It is the last of those incidents—and Cruise’s alleged withholding of camera evidence showing that its car dragged the pedestrian for 20 feet— the DMV’s suspension. As awful as that incident is, the DMV clearly had concerns about Cruise well before it occurred on Oct. 2; in August, the DMV cited safety issues when it forced the company to . Amazingly, it was only two months ago that the California Public Utilities Commission ( is a former Cruise executive) Cruise and Waymo to operate as many robotaxis as they want throughout San Francisco—a decision that was vehemently opposed by city officials as well as angry residents who mounted a grassroots campaign to on robotaxis’ hoods, rendering them inoperable. California’s regulatory structure splits autonomous vehicle responsibilities between the DMV, which handles physical vehicles, and the CPUC, which regulates ride-hail operations. A year ago in Slate, I as unwieldy and sclerotic; the diametrically opposed robotaxi decisions of the CPUC and DMV now make it seem outright dysfunctional. California’s Legislature needs to step in and restructure the state’s self-driving oversight. Beyond the Golden State, the suspension of Cruise’s permits raises questions about the safety of Cruise vehicles on , where the company is now operating, as well as the cities, from Miami to Seattle, where it plans to expand. If Cruise’s technology is too dangerous to operate without a safety driver in San Francisco, why is it OK to subject those living in Nashville or Dallas to the risk? For Cruise, the California DMV’s move is about the last thing the company needs right now. Beyond the freeze in Bay Area operations, the company’s planned will have to be shelved, at least temporarily. Worse, the DMV’s citation of “unreasonable risk” to road users directly contradicts Cruise’s claims, championed frequently by , that regulators must clear the way for robotaxis in an ongoing American road safety crisis. Cruise over the summer in newspapers, including the New York Times, headlined “Humans are terrible drivers,” offering its technology as the optimal solution. That argument ; there are far easier and more immediate ways to reduce crash deaths than by adopting robotaxis, such as installing automated traffic cameras and lowering speed limits. Although the California DMV’s move makes Cruise’s safety pitch seem even less credible, the company appears to be sticking with it. “Ultimately, we develop and deploy autonomous vehicles in an effort to save lives,” while announcing the suspension of operations in San Francisco. Tweaking its safety narrative may be the least of Cruise’s problems right now. A source who previously worked at Cruise shared with me the company’s internal 2023 objectives, including 2,300 robotaxis deployed and $120 million in revenue, mostly from the Bay Area. (Cruise did not respond to questions I asked about those figures while writing a previous article.) Those goals were already going to be a stretch (the company had around 300 autonomous vehicles in August), but halting robotaxi operations in California makes them essentially impossible. Meanwhile, higher interest rates and an ongoing autoworkers strike are adding to the financial pressure of carmakers, including General Motors, Cruise’s patron. GM’s patience with Cruise’s problems could wear thin, perhaps to the point that it walks away entirely—as Ford and Volkswagen did with the Argo.ai a year ago after providing over $1 billion in investment. Waymo, the other robotaxi heavyweight, has been tied to fewer dangerous incidents than Cruise and has not received a similar smackdown from the California DMV. Still, a suspension of Cruise’s permits carries risks for that company as well, especially if it damages the popular perception of robotaxis writ large, as happened in 2018 after a prototype self-driving car from Uber Elaine Herzberg in Tempe, Arizona. Such fears are growing within the AV sector, where Cruise has developed a reputation for playing fast and loose with safeguards. In the hours after the DMV’s announcement, AV boosters were already moving to draw a bright line between Cruise and other AV players. Matt Wansley, a former executive of the AV company nuTonomy, , “Companies should be judged by their on-road safety performance, and there is a significant difference between Cruise and Waymo.” Alex Roy, an Argo.ai veteran, implied that Cruise was an outlier news of its suspension on LinkedIn: “Remember how I’ve been saying not all Autonomous Vehicle developers are the same? Here you go.” But if Cruise does end up shining a harsh spotlight on the entire robotaxi industry, that would hardly be a bad thing. Although robotaxis’ supposed safety benefits remain speculative, their mission to make car use as easy as possible could catalyze driving, emissions, and sprawl—and of American cities. Indeed, Cruise may end up doing America a favor by bringing scrutiny to an emergent technology that badly needs",
  //       publish_date: "2023-10-24T23:19:15.000Z",
  //       image_url: null,
  //       source_id: "slate_usa",
  //       countries: ["united states of america"],
  //       categories: ["top"],
  //       language: "english",
  //       sentiment: "Negative",
  //       s_positive: "0.07076586037874222",
  //       s_negative: "0.6417992115020752",
  //       s_neutral: "0.2874349653720856",
  //       createdAt: "2023-10-26T13:57:52.946Z",
  //       updatedAt: "2023-10-26T13:57:52.946Z",
  //     },
  //     {
  //       id: 5,
  //       company_id: 2,
  //       title:
  //         "Running back Oliveira gets nod as Bombers nominee for CFL outstanding player",
  //       link: "https://www.brandonsun.com/sports/sports-breaking-news/2023/10/25/running-back-oliveira-gets-nod-as-bombers-nominee-for-cfl-outstanding-player",
  //       keywords: ["Football", "Sports Breaking News"],
  //       video_url: "",
  //       description:
  //         "TORONTO – Zach Collaros won’t be in the running for a third straight CFL outstanding player award. The Winnipeg quarterback has won the honour the last two years. But Canadian […]",
  //       content:
  //         "TORONTO - Zach Collaros won't be in the running for a third straight CFL outstanding player award. Read this article for free: Already have an account? As we navigate through unprecedented times, our journalists are working harder than ever to bring you the latest local updates to keep you safe and informed. Now, more than ever, we need your support. Starting at $14.99 plus taxes every four weeks you can access your Brandon Sun online and full access to all content as it appears on our website. or call circulation directly at (204) 727-0527. Your pledge helps to ensure we provide the news that matters most to your community! TORONTO – Zach Collaros won’t be in the running for a third straight CFL outstanding player award. The Winnipeg quarterback has won the honour the last two years. But Canadian running back Brady Oliveira earned the Blue Bombers’ nod Wednesday for this year’s award in voting conducted by the Football Reporters of Canada and nine CFL head coaches. The five-foot-10, 222-pound Oliveira, a Winnipeg native, is the CFL’s rushing leader with 1,498 yards (5.9-yard average) and nine touchdowns. The 26-year-old also has 38 catches for 482 yards and four touchdowns. Oliveira was also a unanimous selection as Winnipeg’s top Canadian nominee. CFL passing leader Vernon Adams Jr. of the B.C. Lions (4,769 yards), Edmonton Elks quarterback Tre Ford (2,069 yards passing, 622 yards rushing in 10 starts), Calgary Stampeders receiver Reggie Begelton (86 catches, 1,169 yards, five TDs) and Saskatchewan Roughriders linebacker Larry Dean (104 tackles) were the other West Division outstanding player nominees. Toronto Argonauts quarterback Chad Kelly (4,123 passing yards, 248 rushing yards and eight TDs), Hamilton Tiger-Cats receiver Tim White (75 catches, CFL-high 1,269 yards, eight TDs), Montreal Alouettes receiver Austin Mack (78 catches, 1,154 yards, four TDs) and Ottawa Redblacks running back Devonte Williams (952 yards rushing, three TDs) were the East Division selections. Adams, Begelton and Kelly were all unanimous picks. The division finalists will be announced next Wednesday. The CFL will honour its top individual performers Nov. 16 at Fallsview Casino & Resort in Niagara Falls, Ont. Joining Oliveira in the West Division’s top Canadian nominees were Ford, defensive lineman Mathieu Betts of the B.C. Lions (CFL-record 17 sacks), Calgary Stampeders linebacker Cameron Judge (91 total tackles, two sacks, two forced fumbles, five interceptions, fumble recovery) and Saskatchewan Roughriders receiver Samuel Emilus (70 catches, 1,097 yards, six TDs). The East Division selections included Hamilton safety Stavros Katsantonis (five interceptions, fumble recovery), Toronto defensive back Royce Metchie (71 tackles, interception, two forced fumbles, fumble recovery), Ottawa defensive lineman Cleyon Laing (seven sacks) and Montreal defensive back Marc-Antoine Dequoy (five interceptions, 184 return yards, two TDs). Ford, Judge, Emilus, Katsantonis, Laing and Dequoy joined Oliveira as unanimous picks. Betts and Dean were both their teams’ nominees as top defensive players. The other West selections included Edmonton defensive lineman Jake Ceresna (12 sacks, tied for second in CFL), Calgary linebacker Micah Awe (118 tackles, 124 total tackles, both CFL highs) and Winnipeg defensive lineman Willie Jefferson (2019 winner, 11 sacks this season. In the East Division, linebackers Simoni Lawrence of Hamilton (83 tackles, five sacks, interception, three forced fumbles), Adarius Pickett of Toronto (114 total tackles to stand second in CFL, five sacks, a forced fumble and two recoveries) and Tyrice Beverette of Montreal (102 total tackles to stand third overall, seven sacks, four fumble recoveries) and Ottawa defensive lineman Bryce Carter (team-high 12 sacks, tied for second in CFL) got the nod. Dean, Jefferson and Carter were unanimous picks. Stanley Bryant, the CFL’s top lineman four times, is another stalwart Blue Bomber who won’t be defending his individual award this year. Jermarcus Hardrick was named Winnipeg’s finalist in 2023. The other West Division nominees were B.C.’s Jarell Broxton, Edmonton’s Martez Ivey, Calgary’s Sean McEwen and Saskatchewan’s Logan Ferland. The East Division selections were Hamilton’s Brandon Revenberg, Toronto’s Dejon Allen, Ottawa’s Jacob Ruby and Montreal’s Pier-Olivier Lestage. Toronto’s Javon Leake, the CFL leader in punt returns (1,153 yards) and return touchdowns (four), headlined the East Division list for outstanding special-teams player. The others include Hamilton’s Tyreik McAllister, Ottawa returner Brandin Dandridge and Montreal punter Joseph Zema. The West nominees were B.C. kicker Sean Whyte, Edmonton defensive back Scott Hutter, Calgary kicker Rene Paredes, Saskatchewan punter Adam Korsak and Winnipeg kicker Sergio Castillo. Leake, Whyte, Korsak and Castillo were unanimous picks. Defensive back Qwan’tez Stiggers, who has 53 tackles and five interceptions in 16 games, was Toronto’s nominee as outstanding rookie. The other East Division nominees were quarterbacks Taylor Powell (Hamilton) and Dustin Crum (Ottawa) and Montreal defensive back Reggie Stubblefield. The West Division selections were Korsak, B.C. linebacker Ryder Varga, Edmonton defensive back Kai Gray, Calgary receiver Clark Barnes and Winnipeg punter Jamieson Sheahan. Stiggers, Crum, Korsak and Varga were unanimous selections. This report by The Canadian Press was first published Oct. 25, 2023. Advertisement Advertisement",
  //       publish_date: "2023-10-25T23:19:15.000Z",
  //       image_url: null,
  //       source_id: "brandonsun",
  //       countries: ["canada"],
  //       categories: ["top"],
  //       language: "english",
  //       sentiment: "Neutral",
  //       s_positive: "0.0565096028149128",
  //       s_negative: "0.04720450565218925",
  //       s_neutral: "0.8962858319282532",
  //       createdAt: "2023-10-26T13:57:52.946Z",
  //       updatedAt: "2023-10-26T13:57:52.946Z",
  //     },
  //   ],
  //   [],
  // );

  const [sentimentData, setSentimentData] = useState<
    SentimentStats | undefined
  >(initialState);

  useEffect(() => {
    const articlesSentiment = articles?.reduce(
      (accumulator, current) => {
        accumulator.total++;

        switch (current.sentiment) {
          case "Positive":
            accumulator.positive++;
            accumulator.sentiment++;
            break;
          case "Negative":
            accumulator.negative++;
            accumulator.sentiment--;
            break;
          case "Neutral":
            accumulator.neutral++;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        positive: 0,
        negative: 0,
        neutral: 0,
        sentiment: 0,
        total: 0,
      },
    );

    setSentimentData(articlesSentiment);
  }, [articles]);
  return (
    <div className="relative m-2 mt-0 flex flex-row justify-between rounded-lg bg-white p-6">
      {/* Star Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute right-6"
      >
        <path
          d="M11.2826 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3716 2.75291 12.4869 2.98638 12.7174 3.45332L14.904 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2775 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.912 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1911 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.9059 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7553 20.57 17.607 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6276 17.9658L7.25491 20.2654C6.7939 20.5078 6.5634 20.6291 6.39296 20.5975C6.24467 20.57 6.11671 20.477 6.04472 20.3445C5.96199 20.1922 6.00601 19.9355 6.09406 19.4221L6.92887 14.5547C6.9549 14.403 6.96791 14.3271 6.9591 14.2545C6.95131 14.1902 6.9311 14.128 6.89959 14.0715C6.86401 14.0076 6.80886 13.9538 6.69857 13.8464L3.16054 10.4004C2.78765 10.0372 2.6012 9.85558 2.57851 9.68377C2.55877 9.5343 2.60754 9.38389 2.71124 9.27444C2.83042 9.14863 3.08796 9.11099 3.60303 9.03571L8.4943 8.32077C8.64641 8.29854 8.72247 8.28742 8.7887 8.25662C8.84735 8.22935 8.90015 8.19096 8.94417 8.14358C8.99389 8.09006 9.02791 8.02113 9.09596 7.88328L11.2826 3.45332Z"
          stroke="#222222"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col gap-3 lg:gap-9">
        <div className="flex flex-row">
          <Image
            src={company.logo}
            width={50}
            height={50}
            alt={`${company.name}-logo`}
            className="m-2 self-start"
          />
          <div>
            <p className="text-primary text-2xl font-bold">{company.name}</p>
            <p className="text-base text-[#A7A7A7]">{company.ticker}</p>
          </div>
        </div>
        <div>
          <p className="text-base text-[#A7A7A7]">Sentiment</p>
          <div className="flex gap-3">
            <p className="text-2xl font-bold text-[#222]">
              {sentimentData?.sentiment ? sentimentData.sentiment : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-8">
        <Link href={`/companies/${company.id}`}>
          <button className="font-lato rounded-lg bg-[#412586] p-2 px-8 py-3 text-white">
            More
          </button>
        </Link>
      </div>
    </div>
  );
}
