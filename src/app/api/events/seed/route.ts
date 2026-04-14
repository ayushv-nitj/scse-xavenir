import { connectDB } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextResponse } from "next/server";
const events = [
{
  name: "Quiz-o-Compute",

  description: "Computer Fundamentals Quiz testing core CS concepts including DBMS, OS, OOPs, STL, Web Tech and more.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108002/WhatsApp_Image_2026-04-14_at_12.47.17_AM_vkgo8z.jpg",

  prizepool: 8000,

  regFees: 200,

  more: `<section>
  <h2>Quiz-o-Compute</h2>

  <div>
    <h3>Event Overview</h3>
    <ul>
      <li>Date: 17th April 2026</li>
      <li>Time: 9:00 AM – 11:30 AM</li>
      <li>Venue: LHC, NIT Jamshedpur</li>
      <li>Team Size: 1–2 Members</li>
      <li>Mode: Offline</li>
    </ul>

    <h3>Topics Covered</h3>
    <ul>
      <li>DBMS</li>
      <li>OOPs</li>
      <li>Operating Systems</li>
      <li>STL</li>
      <li>C/C++ Basics</li>
      <li>Web Technologies</li>
      <li>Computer Organization</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Sankarsharn Rastogi - 8081252928</li>
      <li>Tanishq Gupta - 6299354348</li>
      <li>President (Abhishek): 9798687024</li>
      <li>Event Coordinators: Raj Singh, Sujal Kumar</li>
    </ul>
  </div>
</section>`,

  rules: "No unfair means otherwise disqualification. Participants must attempt the quiz within the given time window at the venue. Judges decision final.",

  minPart: 1,

  maxPart: 2,

  eventDate: new Date("2026-04-17"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "Pixel Sync",

  description: "Frontend web development challenge focused on UI/UX creativity and responsiveness.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108000/WhatsApp_Image_2026-04-14_at_12.48.35_AM_dkpjvr.jpg",

  prizepool: 4000,

  regFees: 100,

  more: `<section>
  <h2>Pixel Sync</h2>

  <div>
    <h3>Event Overview</h3>
    <ul>
      <li>Date: 17th April 2026</li>
      <li>Time: 11:30 AM – 3:00 PM</li>
      <li>Venue: LHC</li>
      <li>Team Size: 1-2 Members</li>
    </ul>


    <h3>Rounds</h3>
    <ul>
      <li>Design Challenge (2 Hours)</li>
      <li>Presentation Round (1 Hours)</li>
    </ul>

    <h3>Judging Criteria</h3>
    <ul>
      <li>UI/UX</li>
      <li>Creativity and Innovation</li>
      <li>Responsiveness</li>
      <li>Code Quality</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Siya - 9310120759</li>
      <li>Anurag - 6395319194</li>
      <li>Aprajita - 9142765159</li>
      <li>President (Abhishek): 9798687024</li>
      <li>Event Coordinators: Raj Singh,Roshni Kumari,Riya</li>
    </ul>

  </div>
</section>`,

  rules: "Bring laptop. Use of any tech stack is allowed. No plagiarism otherwise disqualification. Late submission not accepted.",

  minPart: 1,

  maxPart: 2,

  eventDate: new Date("2026-04-17"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "Mini Carnival Zone",

  description: "Multi-round elimination event testing knowledge, perception, and decision-making under pressure.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108000/WhatsApp_Image_2026-04-14_at_12.49.21_AM_hskw5q.jpg",

  prizepool: 1900,

  regFees: 100,

  more: `<section>
  <h2>Mini Carnival Zone</h2>

  <div>

    <div>
      <h3>Event Overview</h3>
      <ul>
        <li>Venue: LHC, NIT Jamshedpur</li>
        <li>Team Size: Individual Participation</li>
        <li>Date: 17th April 2026</li>
        <li>Time: 3:00 PM – 5:00 PM</li>
        <li>Mode: Offline</li>
        <li>Eligibility: Open to all registered participants</li>
      </ul>
    </div>

    <div>
      <h3>Event Team</h3>
      <ul>
        <li>Raj Singh - 9305360368</li>
        <li>Aameya Devansh - 9234102388</li>
        <li>Sankarsharn Rastogi - 8081252928</li>
        <li>Anuj - 8273179879</li>
        <li>Harsh Agarwal - 7061960920</li>
        <li>President (Abhishek): 9798687024</li>
        <li>Event Coordinators: Udit Pandey, Roshni Kumari, Anurag Sharma</li>
      </ul>
    </div>

    <div>
      <h3>Overview</h3>
      <p>
      The event is designed to test participants across three dimensions: knowledge, perception,
      and decision-making under pressure. With progressively challenging rounds, participants must
      rely on intelligence, observation, and strategic thinking.
      </p>
    </div>

    <div>
      <h3>Objective</h3>
      <ul>
        <li>Test logical reasoning and quick-thinking abilities</li>
        <li>Evaluate psychological awareness and social deduction skills</li>
        <li>Encourage strategic decision-making</li>
        <li>Provide an engaging competitive platform</li>
      </ul>
    </div>

    <div>
      <h3>Event Format</h3>

      <h4>Round 1: Quiz Screening</h4>
      <ul>
        <li>Logic and general knowledge quiz</li>
        <li>Evaluation based on accuracy and speed</li>
        <li>Top performers qualify</li>
      </ul>

      <h4>Round 2: Imposter Detection</h4>
      <ul>
        <li>Groups with one hidden imposter</li>
        <li>Participants identify imposter</li>
        <li>Voting elimination system</li>
      </ul>

      <h4>Round 3: Number Elimination</h4>
      <ul>
        <li>Participants choose numbers</li>
        <li>Average calculated</li>
        <li>Closest to average gets point</li>
        <li>Highest score wins</li>
      </ul>

    </div>

    <div>
      <h3>Rules and Guidelines</h3>
      <ul>
        <li>Report before event start</li>
        <li>All rounds elimination based</li>
        <li>No unfair means allowed</li>
        <li>Judges decision final</li>
      </ul>
    </div>

  </div>

</section>`,

  rules: "Elimination based event. No unfair means allowed.",

  minPart: 1,

  maxPart: 1,

  eventDate: new Date("2026-04-17"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "Debug and Discover",

  description: "Fun analytical and problem-solving event with secret rounds and unconventional challenges.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108112/WhatsApp_Image_2026-04-14_at_12.51.21_AM_le1bwy.jpg",

  prizepool: 4800,

  regFees: 100,

  more: `<section>
  <h2>Debug and Discover</h2>

  <div>

    <div>
      <h3>Event Overview</h3>
      <ul>
        <li>Venue: LHC, NIT Jamshedpur</li>
        <li>Date: 17th April 2026</li>
        <li>Time: 5:00 PM – 6:30 PM</li>
        <li>Team Size: 2-3 Members</li>
        <li>Mode: Offline</li>
        <li>Eligibility: Open to all registered participants</li>
      </ul>
    </div>

    <div>
      <h3>Event Team</h3>
      <ul>
        <li>Raj Singh - 9305360368</li>
        <li>Aameya Devansh - 9234102388</li>
        <li>Sankarsharn Rastogi - 8081252928</li>
        <li>Anuj - 8273179879</li>
        <li>Harsh Agarwal - 7061960920</li>
      </ul>

      <h4>Event Coordinators</h4>
      <ul>
        <li>Udit Pandey</li>
        <li>Roshni Kumari</li>
        <li>Anurag Sharma</li>
      </ul>
    </div>

    <div>
      <h3>Objective</h3>
      <p>
        To test live analytical and problem-solving skills. Instead of traditional competitive 
        programming problems, participants will solve fun problems across different genres.
      </p>
    </div>

    <div>
      <h3>Event Format</h3>
      <p>
        The event format is kept secret to maximize engagement and excitement. 
        Participants should come prepared for surprise challenges.
      </p>
    </div>

    <div>
      <h3>Rules and Guidelines</h3>
      <ul>
        <li>Rules will be announced during the event</li>
        <li>Creative approaches encouraged</li>
        <li>Organizers decision final</li>
      </ul>
    </div>

    <div>
      <h3>Registration Details</h3>
      <ul>
        <li>CSE - Must be SCSE member</li>
        <li>External (Non-CSE) NITIAN Participant: Rs.100 per team</li>
        <li>Non-NITIAN - Must have SCSE prime membership</li>
      </ul>
    </div>

  </div>

</section>`,

  rules: "Rules will be announced during event.",

  minPart: 2,

  maxPart: 3,

  eventDate: new Date("2026-04-17"),

  registerThroughForm: true,

  linkToRegister: ""
},
{
  name: "Web Hackathon",

  description: "Full-stack hackathon testing system design, security, and resource management under real-time constraints.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108211/WhatsApp_Image_2026-04-14_at_12.52.26_AM_1_uotqzf.jpg",

  prizepool: 14500,

  regFees: 100,

  more: `<section>
  <h2>Web Hackathon</h2>

  <div>

    <div>
      <h3>Event Overview</h3>
      <ul>
        <li>Venue: LHC, NIT Jamshedpur</li>
        <li>Team Size: 2–4 Members</li>
        <li>Date: 17th April 2026</li>
        <li>Time: 6:30 PM – Next Day (till 5:00 PM)</li>
        <li>Mode: Offline</li>
        <li>Eligibility: Open to all registered participants</li>
      </ul>
    </div>

    <div>
      <h3>Event Team</h3>
      <ul>
        <li>Harsh Agarwal - 7061960920</li>
        <li>Naveen - 9198511333</li>
      </ul>
    </div>

    <div>
      <h3>Overview</h3>
      <p>
      The event is designed to test developers across three dimensions: full-stack proficiency,
      system security, and resource management. Participants must build functional applications
      while navigating real-time constraints and evolving requirements.
      </p>
    </div>

    <div>
      <h3>Objective</h3>
      <ul>
        <li>Test architectural logic and scalable system design</li>
        <li>Evaluate technical perception and security awareness</li>
        <li>Encourage tactical trade-offs in development</li>
        <li>Build production-ready web solutions</li>
      </ul>
    </div>

    <div>
      <h3>Rules and Guidelines</h3>
      <ul>
        <li>Problem statement revealed at start</li>
        <li>Working prototype must be built within time</li>
        <li>Bring laptops and required tools</li>
        <li>Focus on innovation and practicality</li>
        <li>Submit source code and documentation</li>
        <li>Project presentation required</li>
      </ul>
    </div>

    <div>
      <h3>Judging Criteria</h3>
      <ul>
        <li>Innovation & Creativity</li>
        <li>Functionality & Usability</li>
        <li>Code Quality & Structure</li>
        <li>Problem Relevance</li>
        <li>Presentation Skills</li>
        <li>Submission Time</li>
      </ul>
    </div>

    <div>
      <h3>Registration Details</h3>
      <ul>
        <li>CSE - Must be SCSE member</li>
        <li>External (Non-CSE) NITIAN Participant: Rs.100 per team</li>
        <li>Non-NITIAN - Must have SCSE prime membership</li>
      </ul>
    </div>

  </div>

</section>`,

  rules: "Working prototype required within time limit.",

  minPart: 2,

  maxPart: 4,

  eventDate: new Date("2026-04-17"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "Binary Blitz",

  description: "Fast-paced 1v1 knockout coding contest testing speed and accuracy.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108209/WhatsApp_Image_2026-04-14_at_12.52.57_AM_vonmiz.jpg",

  prizepool: 4000,

  regFees: 100,

  more: `<section>
  <h2>Binary Blitz</h2>

  <div>
    <h3>Event Overview</h3>
    <ul>
      <li>Date: 18th April 2026</li>
      <li>Time: 9:00 AM – 11:00 AM</li>
      <li>Team Size: Individual</li>
      <li>Venue: LHC</li>
    </ul>

    <h3>Format</h3>
    <ul>
      <li>Preliminary Contest</li>
      <li>1v1 Knockout</li>
      <li>Cross Semifinals</li>
      <li>Final + 3rd Place Match</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Tanishq Gupta - 6299354348</li>
      <li>Vignesh Chaurasia - 9152657366</li>
      <li>President (Abhishek): 9798687024</li>
      <li>Event Coordinators:  Sujal Kumar, Vinay Ojha, Anuj</li>
    </ul>

  </div>
</section>`,

  rules: "First correct submission wins",

  minPart: 1,

  maxPart: 1,

  eventDate: new Date("2026-04-18"),

  registerThroughForm: true,

  linkToRegister: ""
},

{
  name: "Ideathon",

  description: "Innovation based idea pitching competition solving real world problems.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108310/WhatsApp_Image_2026-04-14_at_12.53.22_AM_wgfl87.jpg",

  prizepool: 3500,

  regFees: 50,

  more: `<section>
  <h2>Ideathon</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Date: 18th April 2026</li>
      <li>Time: 9:30 AM – 2:00 PM</li>
      <li>Team Size: 1–4 Members</li>
    </ul>

    <h3>Rounds</h3>
    <ul>
      <li>Idea Submission</li>
      <li>Final Pitch</li>
    </ul>

    <h3>Domains</h3>
    <ul>
      <li>Technology</li>
      <li>Healthcare</li>
      <li>Smart Cities</li>
      <li>Education</li>
      <li>FinTech</li>
    </ul>


    <h3>Contacts</h3>
    <ul>
      <li>Sankarsharn Rastogi - 8081252928</li>
      <li>Aman Singh - 7348762674</li>
      <li>President (Abhishek): 9798687024</li>
      <li>Event Coordinators:Aameya Devansh, Srijan Swapnil, Anuj</li>
    </ul>

  </div>
</section>`,

  rules: "Original ideas only. Use of unfair means is prohibited.",

  minPart: 1,

  maxPart: 4,

  eventDate: new Date("2026-04-18"),

  registerThroughForm: false,

  linkToRegister: ""
},


{
  name: "BGMI Tournament",

  description: "Competitive BGMI gaming tournament.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108314/WhatsApp_Image_2026-04-14_at_12.54.30_AM_ghzai8.jpg",

  prizepool: 3500,

  regFees: 100,

  more: `<section>
  <h2>BGMI Tournament</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Date: 18th April 2026</li>
      <li>Time: 1:00 PM – 4:00 PM</li>
      <li>Team Size: 1–4 Members</li>
    </ul>

  </div>

  <div>
      <h3>Event Format</h3>
      <ul>
        <li>Squad format (1–4 players)</li>
        <li>Maps: Erangel, Miramar, Sanhok / Vikendi</li>
        <li>Scheduled matches only</li>
        <li>Final standings based on accumulated points</li>
      </ul>
    </div>

     <div>
      <h3>Event Team</h3>
      <ul>
        <li>Vignesh Chaurasia - 9152657366</li>
        <li>Udit Pandey - 8806099180</li>
      </ul>
    </div>

    <div>
      <h3>Scoring System</h3>
      <h4>Kill Points</h4>
      <ul>
        <li>Each kill = 1 point</li>
      </ul>

      <h4>Placement Points</h4>
      <ul>
        <li>1st Place – 10 Points</li>
        <li>2nd Place – 6 Points</li>
        <li>3rd Place – 5 Points</li>
        <li>4th Place – 4 Points</li>
        <li>5th Place – 3 Points</li>
        <li>6th Place – 2 Points</li>
        <li>7th–8th Place – 1 Point</li>
        <li>9th–25th Place – 0 Points</li>
      </ul>
    </div>

    <div>
      <h3>Rules and Guidelines</h3>
      <ul>
        <li>Players must use their own mobile devices</li>
        <li>Emulators prohibited</li>
        <li>Join custom rooms on time</li>
        <li>Submit IGN before tournament</li>
        <li>No squad changes after registration</li>
        <li>No hacking or unfair play</li>
        <li>Judges decision final</li>
      </ul>
    </div>


     

</section>`,

  rules: "Fair gameplay required",

  minPart: 1,

  maxPart: 4,

  eventDate: new Date("2026-04-18"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "AI ML Hackathon",

  description: "AI/ML solution presentation event focusing on building models from scratch.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108432/WhatsApp_Image_2026-04-14_at_12.55.22_AM_iyat2t.jpg",

  prizepool: 7800,

  regFees: 100,

  more: `<section>
  <h2>AI ML Hackathon</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Date: 18th April 2026</li>
      <li>Time: 3:30 PM – 6:00 PM</li>
      <li>Team Size: 1–3 Members</li>
    </ul>

    <h3>Format</h3>
    <ul>
      <li>Problem statement will release on 14th April 2026.</li>
      <li> Two Problem statements will be provided</li>
      <li>Participants may choose any one problem statement</li>
      <li>Final evaluation will be based on presentation and implementation</li>
      <li>Presentation duration - 10 minutes per team (flexible)</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Shivapreetham - 9845920244</li>
      <li>Keshav Trivedi - 8401229069</li>
      <li>Pransanjeet Reddy - 8401229069</li>
      <li>President (Abhishek): 9798687024</li>
      <li>Event Coordinators: Aameya Devansh, Srijan Swapnil, Anuj </li>
    </ul>

  </div>
</section>`,

  rules: "No pretrained models allowed. Build from scratch.",

  minPart: 1,

  maxPart: 3,

  eventDate: new Date("2026-04-18"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "CodeZenith (CP Contest)",

  description: "Competitive programming contest hosted on GFG.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108441/WhatsApp_Image_2026-04-14_at_12.56.01_AM_ockyuw.jpg",

  prizepool: 8000,

  regFees: 200,

  more: `<section>
  <h2>CodeZenith</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Date: 19th April 2026</li>
      <li>Time: 8:30 AM – 12:30 PM</li>
      <li>Team Size: 1–2 Members</li>
    </ul>

    <h3>Platform</h3>
    <ul>
      <li>GeeksforGeeks Contest</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Tanishq Gupta - 6299354348</li>
      <li>Vignesh Chaurasia - 9152657366</li>
      <li> Shivansh Singh - 9102535556</li>
      <li>President (Abhishek): 9798687024</li>
      <li> Event Coordinators: Sujal Kumar, Aman Singh, Harsh Agarwal</li>
    </ul>

  </div>
</section>`,

  rules: "No plagiarism",

  minPart: 1,

  maxPart: 2,

  eventDate: new Date("2026-04-19"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "Movie Mania",

  description: "Fun movie-based trivia and acting competition for cinephiles.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108528/WhatsApp_Image_2026-04-14_at_12.56.43_AM_ljl8fi.jpg",

  prizepool: 2000,

  regFees: 50,

  more: `<section>
  <h2>Movie Mania</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Date: 19th April 2026</li>
      <li>Time: 2:00 PM – 5:00 PM</li>
      <li>Team Size: 2 Members</li>
      <li>Venue: LHC</li>
    </ul>


    <h3>Contacts</h3>
    <ul>
      <li>Aameya Devansh - 9234102388</li>
      <li>Sankarsharn Rastogi - 8081252928</li>
      <li>President (Abhishek): 9798687024</li>
      <li>Event Coordinators: Srijan Swapnil, Anuj, Raj Singh, Roshni Kumari</li>
    </ul>

    <h3>Rounds</h3>
    <ul>
      <li>Movie Trivia Quiz</li>
      <li>Dumb Charades (Taboo Twist)</li>
      <li>Emotional Bonanza Acting</li>
    </ul>

  </div>
</section>`,

  rules: "No unfair means otherwise disqualification.",

  minPart: 2,

  maxPart: 2,

  eventDate: new Date("2026-04-19"),

  registerThroughForm: true,

  linkToRegister: ""
},

{
  name: "Paper Dance",

  description: "Fun dance competition with shrinking paper challenge.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108527/WhatsApp_Image_2026-04-14_at_12.57.56_AM_ptvq2z.jpg",

  prizepool: 1900,

  regFees: 0,

  more: `<section>
  <h2>Paper Dance</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Date: 19th April 2026</li>
      <li>Time: 4:30 PM onwards</li>
      <li>Team Size: Couple</li>
      <li>Venue: LHC</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Riya - 6232681526</li>
      <li>Siya - 9310120759</li>
      <li>Shreehari - 7033558339</li>
      <li>President (Abhishek): 9798687024</li>
    </ul>


    <h3>Rounds</h3>
    <ul>
      <li>Random Dance</li>
      <li>Paper Dance Final</li>
    </ul>

  </div>
</section>`,

  rules: "Couple participation irrespective of gender (Boy+Girl, Girl+Girl, Boy+Boy)",

  minPart: 2,

  maxPart: 2,

  eventDate: new Date("2026-04-19"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "Golgappa Challenge",

  description: "Fun eating challenge exclusively for girls.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108599/WhatsApp_Image_2026-04-14_at_12.58.40_AM_qfpbgc.jpg",

  prizepool: 1000,

  regFees: 50,

  more: `<section>
  <h2>Golgappa Challenge</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Date: 19th April 2026</li>
      <li>Time: 5:00 PM – 6:00 PM</li>
      <li>Team Size: Individual</li>
      <li>Girls Only Event</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Shreehari - 7033558339</li>
      <li>Sujal - 9693780078</li>
      <li>President (Abhishek): 9798687024</li>
    </ul>

    <h3>Rounds</h3>
    <ul>
      <li>Musical Chair</li>
      <li>Golgappa Eating Challenge</li>
    </ul>

  </div>
</section>`,

  rules: "Hygiene rules must be followed. Late entry not be permitted.",

  minPart: 1,

  maxPart: 1,

  eventDate: new Date("2026-04-19"),

  registerThroughForm: false,

  linkToRegister: ""
},

{
  name: "Social Media Challenge",

  description: "Online reels and meme competition for social media engagement.",

  logo: "https://res.cloudinary.com/dtieuimsz/image/upload/v1776108594/WhatsApp_Image_2026-04-14_at_12.59.32_AM_mga4yh.jpg",

  prizepool: 2000,

  regFees: 50,

  more: `<section>
  <h2>Social Media Challenge</h2>

  <div>

    <h3>Event Overview</h3>
    <ul>
      <li>Mode: Online</li>
      <li>Platform: Instagram</li>
      <li>Deadline: 18th April 2026, 11:59 PM</li>
      <li>Eligibility: 1st Year B.Tech. Students Only</li>
    </ul>

    <h3>Tracks</h3>
    <ul>
      <li>Reels</li>
      <li>Memes</li>
    </ul>

    <h3>Judging Criteria</h3>
    <ul>
      <li>Reach</li>
      <li>Creativity</li>
      <li>Originality</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>Aameya Devansh - 9234102388</li>
      <li>Anuj - 8273179879</li>
      <li>President (Abhishek): 9798687024</li>
    </ul>

  </div>
</section>`,

  rules: "No vulgar content. Only for B.Tech. 1st years",

  minPart: 1,

  maxPart: 1,

  eventDate: new Date("2026-04-18"),

  registerThroughForm: false,

  linkToRegister: ""
}

]

export async function POST() {
  try {
    await connectDB();
    const inserted = await Event.insertMany(events);

    return NextResponse.json({
      success: true,
      message: "Events inserted successfully",
      count: inserted.length,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}