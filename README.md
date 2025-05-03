# Amy's Wish with Wings Website

## Website Migration Design Document 5/2/2025

### Context

The Amy's Wish with Wings website is currently simple vanilla JavaScript website hosted on Netlify.
When a stakeholder requests updates to the website, the web master must manually make changes to the appropriate configuration objects in the code on behalf of the stakeholder.
The stakeholders, who are non-technical, could benefit from a WYSIWYG (what you see is what you get) editor that allows routine updates to be done without touching the code.
Another problem with the website is that the contact form is broken and needs to be repaired. The contact form should notify the chief stakeholder (not the web master) with any submissions.
Two other minor problems with the website are unnecssary duplication of code that might make certain modifications difficult as well as potential vulnerability to a denial of service attack. 

### Solution

I propose porting the website from vanilla JavaScript to a JavaScript framework to solve two problems.
Building a WYSIWYG editor may require more complexity than vanilla JavaScript can afford.
Additionally, a front-end framework would allow the abstraction of duplicated code into components.
I have chosen React as the front-end framework because I have experience with it and it has a very large talent pool.

I propose migrating away from Netlify and towards Cloudflare for hosting. Cloudflare has a generous free tier which, unlike Netlify, includes DDoS protection.
Furthermore, building a WYSIWYG editor will likely require persistent server-side storage and the Cloudflare Developer Platform has storage solutions which can easily integrate with a Cloudflare-hosted website.

#### Roadmap

1. Port the old website to React
2. Repair the contact form and program it to send submissions to the chief stakeholder. Include error handling and report any errors via email to the web master.
3. Implement the WYSIWYG Editor
