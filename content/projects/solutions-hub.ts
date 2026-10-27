import type { Project } from '../types';

/**
 * The department itself as a product: a Telegram Mini App that shows what the
 * computational-design department already has before it asks for a request.
 * Counts are taken from the app's own catalogue (web/src/features in the
 * comp_design_bot repo, 2026-10-13) and its test suites; pilot figures from
 * the app's /my/metrics/ screen, 90 days to 2026-10-27.
 */
export const solutionsHub: Project = {
  slug: 'solutions-hub',
  title: 'The department, as a catalogue',
  tag: 'Pilot',
  summary:
    "A Telegram Mini App for IND's computational-design department: architects see what the department has already built, take a ready script or tool when one fits, and file a request with its context attached when nothing does — straight onto the department's own Pyrus board.",
  meta: 'C# · .NET · Next.js · Telegram Mini App · Pyrus API',
  hero: {
    kind: 'image',
    image: {
      src: '/assets/img/solutions-hub-cover.webp',
      alt: 'The Mini App on a phone: a topic card with a ready solution and a request button under it',
      width: 2396,
      height: 1348,
    },
  },
  blocks: [
    {
      kind: 'prose',
      heading: 'Problem',
      paragraphs: [
        [
          "Most architects at the bureau didn't know what the computational-design department had already built. Requests arrived as chat messages with no project number, no source files and no picture of the expected result, so the first day of a task went on asking questions.",
        ],
        [
          'Meanwhile scripts written for one project were rebuilt for the next, because nobody outside the department could see them. The department had a library; it just had no front door.',
        ],
      ],
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '9',
          label: 'Topics',
          note: 'What the department does, phrased as the problem an architect has, each with a typical turnaround',
        },
        {
          value: '41',
          label: 'Ready solutions',
          note: '16 project algorithms, 8 tools, 17 reusable Grasshopper modules',
        },
        {
          value: '6',
          label: 'Request states',
          note: 'From "under review" to "done", mirrored from the board',
        },
        {
          value: '200+',
          label: 'Automated tests',
          note: 'Server and Mini App, unit and end-to-end',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'A catalogue before a form',
      paragraphs: [
        [
          'The app opens on topics, not on a request form: "many similar but different elements", "an idea I can\'t model yet", "check a design decision". Each topic opens what already exists for it, in three kinds — algorithms from past IND projects, tools an architect can run alone (IND Solar, the wind-comfort package, CrowdFlow, export pipelines to Blender and 3ds Max), and Grasshopper modules from the department\'s shared library.',
        ],
        [
          'A past project has a "Want the same" button that opens a request with that project already attached. If nothing fits, "Didn\'t find it?" opens the same form with the topic filled in. Either way the department starts from context instead of from a blank message.',
        ],
      ],
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'group',
          cols: 4,
          ratio: '860 / 1861',
          cells: [
            {
              image: {
                src: '/assets/img/solutions-hub-deck.webp',
                alt: 'Topic card: many similar but different elements, with ready solutions listed under it',
                width: 860,
                height: 1861,
              },
              label: 'Topics',
            },
            {
              image: {
                src: '/assets/img/solutions-hub-solution-guide.webp',
                alt: 'A ready tool, Rhino to Blender, with install steps and the path to its files',
                width: 860,
                height: 1861,
              },
              label: 'Ready solution',
            },
            {
              image: {
                src: '/assets/img/solutions-hub-request-form.webp',
                alt: 'Request sheet with the topic and the chosen solution already attached',
                width: 860,
                height: 1861,
              },
              label: 'Request with context',
            },
            {
              image: {
                src: '/assets/img/solutions-hub-feed.webp',
                alt: "The department's board: what is queued, in progress and done",
                width: 860,
                height: 1861,
              },
              label: 'Department board',
            },
          ],
        },
      ],
      credit: 'Interface in Russian, as used at the bureau.',
    },
    {
      kind: 'prose',
      heading: "Requests land on the department's own board",
      paragraphs: [
        [
          'There is no separate request database. A request is created straight in Pyrus, the system the department already plans its work in, and the app reads its status back from there — so the board stays the single source of truth and nobody re-types anything.',
        ],
        [
          "Form fields are matched by name rather than by internal id, so the department can rearrange its own board without breaking the app. The project field suggests numbers from the bureau's project directory. Before a new request is filed, the app shows open work on the same project, and an architect can follow an existing task instead of creating a duplicate.",
        ],
      ],
    },
    {
      kind: 'prose',
      heading: 'Built to live on the bureau\'s servers',
      paragraphs: [
        [
          "The first version was a Python bot with a static page. Once it was clear the bureau would keep it, the server was rewritten in C# on .NET to run on the bureau's existing bot infrastructure, and the Mini App was rebuilt in Next.js to the bureau's front-end standard. Sign-in goes through a short-lived code from the bot, so the app knows who the architect is without a password.",
        ],
      ],
      aside: {
        kind: 'video',
        video: {
          src: '/assets/img/solutions-hub-walkthrough.mp4',
          poster: '/assets/img/solutions-hub-walkthrough-poster.jpg',
          title: 'Walkthrough: topic, ready solution, request, status',
          width: 860,
          height: 1861,
        },
      },
    },
    {
      kind: 'prose',
      heading: 'Measured from inside the app',
      paragraphs: [
        [
          'The pilot is measured by the app itself. Every session writes events to the server, keyed by a hash of the user rather than the Telegram id. The headline number is the share of sessions where someone found a path — opened a ready solution, copied its file path, or sent a request. The guardrail is the opposite: sessions that looked at cards and left with nothing. A falling request count only counts as success if that guardrail does not rise with it.',
        ],
        [
          "Request quality comes from the board's own history in Pyrus: how many requests were accepted without a round of clarification, and how long they waited before work started. The summary sits behind an admin screen in the app, so the department reads it where the work happens.",
        ],
      ],
    },
    {
      kind: 'prose',
      heading: 'What the pilot showed',
      paragraphs: [
        [
          'The first 90 days are small, and the numbers say so plainly. The instrumentation works; the audience has not arrived yet.',
        ],
      ],
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '4',
          label: 'People',
          note: 'Signed in over 90 days, none returned yet',
        },
        {
          value: '39',
          label: 'Opens',
          note: '33 of them without signing in',
        },
        {
          value: '8%',
          label: 'Found a path',
          note: 'Took a ready solution or sent a request',
        },
        {
          value: '92%',
          label: 'Left with nothing',
          note: 'Looked at the cards and closed the app',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'The bottleneck is the door, not the room',
      paragraphs: [
        [
          'Most opens never got past sign-in, and nobody came back on their own. That points away from the catalogue and towards distribution: the app lives one tap away inside Telegram, but nothing in an architect\'s day sends them there. Requests still arrive the old way, in the department chat.',
        ],
        [
          'So the next step is not another screen. It is a link from the department chat in place of a free-form message, links from the bureau\'s project system to the matching topic, and an easier first sign-in. The same metrics will show whether it worked — the guardrail first.',
        ],
      ],
    },
  ],
};
