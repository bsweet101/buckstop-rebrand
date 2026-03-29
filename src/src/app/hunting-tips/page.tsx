import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import AuthorBio from '@/components/AuthorBio';
import ExpandableArticle from './ExpandableArticle';

export const metadata: Metadata = {
  title: 'Deer Hunting Tips & Field Guides | Buck Stop Lure Co.',
  description:
    'Expert whitetail hunting tips: rattling, scrapelines, rut timing & scent elimination. 70+ years of field-tested advice.',
};

const articles = [
  {
    slug: 'when-to-rattle',
    image: '/images/articles/rattling.jpg',
    title: 'When to Rattle Whitetails',
    excerpt:
      'Rattling can be one of the most effective techniques during the rut, but timing is everything. Learn the optimal conditions, moon phases, and rut stages that make rattling irresistible to mature bucks.',
    category: 'Rut Tactics',
    content: `Rattling is one of the most exciting and effective ways to call in a mature whitetail buck, but success depends entirely on timing and conditions. Here is a breakdown by rut phase:

**Pre-Rut (Late October)**
During the pre-rut, bucks are establishing dominance hierarchies. Light, short rattling sequences of 30 to 60 seconds can simulate sparring matches between younger bucks. This curiosity-driven approach works best in areas with a balanced buck-to-doe ratio. Use Buck Stop Supreme Buck Urine near your setup to add realism.

**Peak Rut (Early to Mid November)**
This is prime time for aggressive rattling. Bucks are actively seeking does and will challenge rivals. Use loud, sustained sequences lasting 1 to 3 minutes with pauses in between. Combine rattling with a drag rag soaked in Mate-Triks Doe-In-Heat or 200 PROOF to create the illusion of two bucks fighting over a hot doe.

**Post-Rut (Late November to December)**
Bucks are worn down but still responsive. Return to lighter rattling sequences. Pair with estrus scents, as some does cycle late and bucks know it.

**Best Conditions for Rattling**
- Cool, calm mornings with light wind
- Overcast skies with moderate temperatures
- Areas with good buck density and a tight buck-to-doe ratio
- Set up downwind of where you expect bucks to approach

**Pro Tip from Buck Stop:** Always have a scent drag deployed with doe estrus when rattling. A buck responding to a fight expects to find deer -- if he smells nothing, he will hang up out of range.`,
  },
  {
    slug: 'making-scrapelines',
    image: '/images/articles/scrapelines.jpg',
    title: 'Making Effective Scrapelines',
    excerpt:
      'Mock scrapes are a proven way to inventory bucks in your area and create reliable ambush points. Discover how to build a scrapeline that keeps bucks coming back all season long.',
    category: 'Scent Strategy',
    content: `Mock scrapes are one of the most underused yet highly effective tactics for patterning and attracting mature bucks. A well-placed scrapeline creates a communication hub that bucks cannot resist visiting.

**What You Need**
- A sturdy stick or garden trowel to clear leaf litter
- An overhanging licking branch (essential -- bucks deposit scent from their forehead and preorbital glands here)
- Buck Stop Ruck'n Buck or Guide Grade Scents Rutting Buck urine
- Buck Stop Buck Beads for long-lasting scent dispersal

**Step-by-Step Mock Scrape Setup**
1. **Choose Your Location:** Look for natural travel corridors, field edges, or ridge saddles where bucks move between bedding and feeding areas. Existing licking branches are ideal.
2. **Clear the Ground:** Use a stick (not your hands) to scrape away leaves and debris in a 2 to 3 foot circle beneath the licking branch. Wearing rubber boots minimizes ground scent.
3. **Apply Scent:** Pour buck urine directly into the scrape. For sustained effectiveness, add Buck Beads -- these biodegradable scent-infused beads release scent slowly over several days.
4. **Work the Licking Branch:** Apply a small amount of forehead gland scent or buck urine to the branch tip. This is where most communication happens.
5. **Build a Line:** Create 3 to 5 mock scrapes spaced 30 to 50 yards apart along a travel corridor leading to your stand location.

**When to Start**
Begin building mock scrapes in early October before the pre-rut. Bucks will find and adopt them as their own. Refresh scent weekly or after heavy rain.

**Buck Beads Advantage:** Unlike liquid scents that evaporate quickly, Buck Beads provide continuous scent output for days. Place a handful directly in each scrape for hands-free, long-lasting attraction.`,
  },
  {
    slug: 'pre-season-scouting',
    image: '/images/articles/scouting.jpg',
    title: 'Pre-Season Scouting Tips',
    excerpt:
      'The work you put in before opening day determines your success. From trail camera strategies to reading sign, here is a complete guide to scouting without spooking your target buck.',
    category: 'Preparation',
    content: `The most successful deer hunters do their homework long before opening day. July through September is prime scouting season, and the goal is to learn as much as possible while leaving as little human impact as possible.

**July Scouting: Glassing and Observation**
Bucks are in bachelor groups and following predictable summer feeding patterns. Glass bean fields, alfalfa, and food plots during the last two hours of daylight. Note entry points and trail locations. Use Scent Stop products on your clothing even during scouting trips to minimize scent contamination.

**August: Trail Camera Deployment**
- Place cameras on field edges, water sources, and mineral sites
- Use the "cell camera on the perimeter, card camera deep" strategy to minimize intrusion
- Check cameras during midday when deer are bedded and less likely to be disturbed
- Wear rubber boots and spray down with Scent Stop Human Scent Eliminator before each visit

**September: Sign Reading and Stand Prep**
- Look for early scrapes, rubs, and fresh trails as bucks break bachelor groups
- Identify staging areas where bucks hold just inside cover before entering feeding areas at dusk
- Hang stands and clear shooting lanes now -- this gives several weeks for the area to settle before the hunt
- Mark potential mock scrape locations along travel routes you have identified

**Scent Discipline During Scouting**
Your biggest enemy during scouting is leaving human scent in the areas you plan to hunt. Every trip educates the deer. Follow this protocol:
- Wash scouting clothes in Scent Stop Laundry Soap
- Shower with Scent Stop Body Wash before each outing
- Spray all gear with Scent Stop Human Scent Eliminator
- Wear knee-high rubber boots
- Plan entry and exit routes that avoid crossing deer trails

**The Payoff:** Hunters who invest 10+ hours of pre-season scouting consistently harvest larger, more mature bucks than those who simply show up on opening day.`,
  },
  {
    slug: 'the-rut-cycle-explained',
    image: '/images/articles/rut-cycle.jpg',
    title: 'The Rut Cycle Explained',
    excerpt:
      'Understanding the phases of the rut from pre-rut to post-rut is critical for choosing the right scent and strategy. Break down each phase and learn what triggers buck movement.',
    category: 'Deer Behavior',
    content: `The whitetail rut is not a single event but a progression of behavioral phases driven by photoperiod (day length), testosterone levels, and doe estrus cycles. Understanding each phase helps you choose the right scent and tactic.

**Phase 1: Pre-Rut (October 15 - October 31)**
Bucks begin making scrapes and rubs as testosterone rises. They are establishing territories and dominance. Bachelor groups break up. This is the time for:
- Mock scrapes with Supreme Buck Urine or Guide Grade Non-Rutting Buck urine
- Light rattling and grunt calls
- Curiosity-based scents like Rack-koon

**Phase 2: Seeking Phase (November 1 - November 7)**
Bucks are actively cruising for the first does to enter estrus. Daytime movement increases dramatically. They are checking scrapes frequently and covering large areas. Best tactics:
- Doe estrus scents on drag rags along travel routes
- Buck Stop Mate-Triks Doe-In-Heat at stand sites
- All-day sits near doe bedding areas and funnels

**Phase 3: Peak Breeding / Lock-Down (November 8 - November 20)**
Most does are bred during this window. Mature bucks lock down with individual does for 24 to 48 hours. Sightings may actually decrease as bucks stay with receptive does. Strategies:
- 200 PROOF or Guide Grade Doe-In-Heat to pull bucks off does
- Aggressive rattling to simulate competition
- Focus on doe bedding areas where bucks will return after breeding

**Phase 4: Post-Rut (November 21 - December 10)**
Most does have been bred. Bucks are exhausted but still moving. A second estrus cycle occurs about 28 days after the first, bringing unbred does and doe fawns into heat. This is an overlooked opportunity:
- Estrus scents remain effective as bucks search for late-cycling does
- Bucks are hungry and predictable near food sources
- Less hunting pressure means deer are more relaxed

**What Triggers the Rut?**
Contrary to popular belief, the rut is triggered primarily by photoperiod -- the decreasing ratio of daylight to darkness in autumn. Moon phase, temperature, and barometric pressure can influence the intensity of daytime movement, but they do not change the timing of peak breeding, which is remarkably consistent from year to year within a given latitude.`,
  },
  {
    slug: 'scent-elimination-system',
    image: '/images/articles/scent-elimination.jpg',
    title: 'Building a Scent Elimination System',
    excerpt:
      'Your scent control routine starts long before you hit the woods. Build a complete scent elimination system from laundry to entry route that gives you the edge against a whitetail\'s nose.',
    category: 'Scent Strategy',
    content: `A whitetail deer can detect human odor at distances of a quarter mile or more under the right conditions. No matter how good your stand location or how effective your attractant, a single whiff of human scent will send a mature buck in the opposite direction. Buck Stop's Scent Stop line provides a complete, head-to-toe scent elimination system.

**Step 1: Laundry**
Wash all hunting clothing in Scent Stop Laundry Soap. This unscented, UV-free formula removes odors without adding perfumes or optical brighteners that deer can see. It is safe for all fabrics including activated carbon clothing. After washing, store clothing in a sealed container or scent-free bag until you are ready to hunt.

**Step 2: Body**
On hunt day, shower with Scent Stop Body Wash from head to toe. Pay extra attention to hair, underarms, and feet -- the areas that produce the most scent. Do not apply deodorant, cologne, or scented products afterward.

**Step 3: Gear**
Wipe down your bow, quiver, tree stand, and any hard gear with a cloth sprayed with Scent Stop Human Scent Eliminator. Scent molecules cling to metal and plastic surfaces and can be detected by deer even when you cannot smell them yourself.

**Step 4: Field Application**
Before walking to your stand, spray your outer clothing thoroughly with Scent Stop Human Scent Eliminator. Give extra attention to your hat, back, and boot soles. Spray again once you reach your stand and are settled in.

**Step 5: Entry Route**
Plan your entry route to take advantage of the prevailing wind. Walk through water crossings when possible. Wear knee-high rubber boots that have been stored in a scent-free container.

**The Complete System:**
- Scent Stop Laundry Soap -- for all hunting clothing and base layers
- Scent Stop Body Wash -- unscented head-to-toe cleansing
- Scent Stop Human Scent Eliminator Spray -- field spray for clothing and gear

**Pro Tip:** Even with a complete scent elimination routine, always play the wind. Scent control reduces your scent signature but does not make you invisible. Use it as an added layer of insurance, not a substitute for good wind strategy.`,
  },
  {
    slug: 'first-deer-season-checklist',
    image: '/images/articles/first-season-checklist.jpg',
    title: 'Your First Deer Season: The Only Checklist You Need',
    excerpt:
      'Everything a first-time hunter needs -- gear, licenses, scent control, and what NOT to bring.',
    category: 'Beginner',
    content: `Getting ready for your first deer season can feel overwhelming. Every forum has a different opinion, every catalog has a hundred pages of gear, and your buddy swears you need things you have never heard of. Here is the truth: you need less than you think, but what you do bring needs to be right. This is the checklist we give every new hunter who walks through our door.

**Clothing Layers**
Dress for the temperature you will be sitting in, not walking in. A moisture-wicking base layer keeps sweat off your skin. A mid-layer of fleece or wool provides insulation. Your outer layer should be quiet, windproof, and in an appropriate camouflage pattern for your terrain. Avoid cotton at all costs -- it holds moisture, loses insulation when wet, and takes forever to dry. Budget around $150 to $300 for a solid layering system from any major hunting brand.

**Weapon and Optics**
Whether you choose a rifle, shotgun, muzzleloader, or bow, the most important thing is that you are proficient with it before opening day. Pair your firearm with a quality scope or sights appropriate for your expected shooting distance. A decent binocular in the $100 to $200 range will change the way you hunt -- you will spot deer you never knew were there. Budget $300 to $600 for weapon, optic, and ammunition combined if buying used or entry-level.

**Scent Control**
This is the number one thing beginners skip, and it is the number one reason they go home empty-handed. A whitetail will smell you from a quarter mile away if you show up wearing clothes that sat in your truck all week. Start with the Buck Stop Scent Stop system: Laundry Soap for your hunting clothes, Body Wash for hunt-day showers, and Human Scent Eliminator Spray for the field. Store your hunting clothes in a sealed bag or tote, not in a closet. Budget $25 to $40 for the complete Scent Stop lineup.

**Calls**
A simple grunt tube and a bleat can are all you need your first season. Do not buy five different calls and try to use them all -- that is a recipe for overcalling. Learn one soft doe bleat and one basic grunt, and use them sparingly. Budget $15 to $30.

**Attractant Scent**
For your first season, keep it simple. Buck Stop Mate-Triks Doe-In-Heat is a proven estrus scent that works during the rut without requiring advanced application techniques. Soak a drag rag, pull it to your stand, hang it on a branch 20 yards out. That is the whole system. Budget $10 to $15.

**Safety Gear**
A full-body safety harness is non-negotiable if you are hunting from a tree stand. Falls from tree stands injure more hunters every year than any other cause. A headlamp with a red-light mode gets you to and from the stand without spooking deer. Budget $50 to $75.

**Field Dressing Kit**
A sharp fixed-blade knife, latex gloves, game bags, and a few zip ties. You do not need a 12-piece kit. One good knife that you know how to use is better than a pouch full of gadgets. Budget $25 to $40.

**The Budget Starter Kit Breakdown**
- Clothing layers: $150 to $300
- Weapon, optic, ammo: $300 to $600
- Scent Stop system: $25 to $40
- Calls: $15 to $30
- Mate-Triks attractant: $10 to $15
- Safety harness and headlamp: $50 to $75
- Field dressing kit: $25 to $40
- Licenses and tags: $75 to $160 (varies by state)
- **Total: $650 to $1,260**

**What NOT to Bring**
- Excessive gear that clanks, rattles, or takes 20 minutes to set up
- Cotton clothing of any kind
- Scented deodorant, cologne, or body spray
- Your phone on full volume (silent mode, face down)
- The attitude that you will fill a tag on day one -- patience is the real gear

**One Last Thing:** Get your licenses and tags sorted out weeks before the season. Nothing ruins opening morning like realizing your tag is not valid for the unit you are hunting. Check your state wildlife agency website, complete any required hunter education courses, and have everything printed and in your pack the night before.`,
  },
  {
    slug: '10-mistakes-new-deer-hunters',
    image: '/images/articles/mistakes.jpg',
    title: '10 Mistakes Every New Deer Hunter Makes',
    excerpt:
      "Don't learn these the hard way. Avoid the most common beginner blunders from your first sit.",
    category: 'Beginner',
    content: `Every experienced hunter has a long list of lessons learned the hard way. The good news is you do not have to repeat all of them. Here are the ten mistakes we see first-time deer hunters make most often, and how to fix each one before it costs you a deer.

**1. Ignoring Wind Direction**
This is the single biggest mistake in deer hunting, period. If the wind is blowing from you toward the deer, the hunt is over before it starts. Before every sit, check the wind with a puff bottle or milkweed and make sure your scent is blowing away from where you expect deer to approach. If the wind is wrong for your stand, hunt a different stand. No setup is worth hunting with a bad wind.

**2. Poor Stand Placement**
Hanging a stand where you saw a deer once is not a strategy. Stands need to be placed based on terrain features, travel corridors, food sources, and prevailing wind direction. Look for pinch points, saddles, ridge ends, and creek crossings where deer movement is funneled. Set up 20 yards downwind of the trail, not directly on top of it.

**3. Not Practicing with Your Weapon**
Too many new hunters fire three rounds at the range in September and call it good. If you are shooting a rifle, you should be comfortable making your expected shot from a seated or standing position, not just a bench rest. Bowhunters should be shooting several times a week for months before the season. The woods are not the place to discover your form breaks down under pressure.

**4. Moving Too Much**
Deer see movement before they see shapes. Fidgeting, constantly turning your head, checking your phone, and adjusting your gear will get you busted every time. Practice sitting still for long stretches. When you need to move, do it slowly and only when a deer is looking away or has its head behind a tree. Keep all your gear within arm's reach so you are not digging through a pack mid-hunt.

**5. Arriving Late and Loud**
Stomping to your stand 15 minutes before shooting light, slamming your truck door, and crunching through dry leaves is a great way to push every deer out of the area. Plan to be settled in your stand at least 30 to 45 minutes before first light. Walk slowly. Close doors gently. Use a red or green headlamp, not a white one. Every sound you make in the dark is amplified.

**6. Overcalling**
New hunters tend to grab their grunt tube every five minutes and blow it like a trumpet. Deer do not vocalize constantly, and neither should you. Start with a single soft doe bleat or grunt every 20 to 30 minutes. If a deer is approaching, stop calling and let it come. More hunts are ruined by overcalling than by not calling at all.

**7. No Scent Control**
Showing up in jeans you wore to the gas station, boots that smell like truck carpet, and no scent elimination products is giving deer every advantage. Wash your hunting clothes in Buck Stop Scent Stop Laundry Soap, shower with Scent Stop Body Wash, and spray everything down with Scent Stop Human Scent Eliminator before heading in. Store hunting clothes in a sealed container between hunts. This is not optional -- it is the baseline.

**8. Rushing the Shot**
When a buck finally walks out, adrenaline takes over and rational thought goes out the window. New hunters rush the shot -- they skip their breathing routine, ignore their shooting fundamentals, and pull the trigger before the deer is in a clear shooting lane or at a comfortable distance. Take a breath. Wait for the right angle. Let the deer walk into your setup rather than forcing a marginal shot.

**9. No Post-Shot Plan**
You pulled the trigger or released the arrow. Now what? Many first-time hunters have no plan for what happens next. Before the season, know this: mark the spot where the deer was standing when you shot. Mark where you last saw the deer. Wait at least 30 minutes before climbing down (longer for a marginal hit). Walk to the hit site and look for blood, hair, and your arrow if applicable. Follow the blood trail slowly and methodically. Have a headlamp, flagging tape, and a phone with GPS ready.

**10. Hunting the Same Spot Every Day**
Deer pattern you just like you pattern them. If you hunt the same stand every morning for a week straight, the deer in that area know something is wrong. Rotate between two or three stands based on wind direction and conditions. Give each stand a rest of at least two to three days between sits. This is especially critical on small properties where deer have limited escape options.

**The Common Thread:** Most of these mistakes come down to impatience or lack of preparation. Put in the work before the season -- practice shooting, set up your scent control system, scout your stands, and make a plan. The hunters who fill tags consistently are not lucky. They are prepared.`,
  },
  {
    slug: 'opening-morning-first-hunt-guide',
    image: '/images/articles/opening-morning.jpg',
    title: 'Opening Morning: A Step-by-Step First Hunt Guide',
    excerpt:
      'Exactly what to do from the night before through your first sit. A minute-by-minute guide.',
    category: 'Beginner',
    content: `Your first opening morning should not be stressful. It should be exciting, focused, and methodical. This is the step-by-step timeline we walk every new hunter through, from the evening before through your first sit and beyond.

**The Night Before (7:00 PM)**
Lay out every piece of gear you are taking. Do not pack in the morning -- you will forget something in the dark. Organize by category: clothing layers in one pile, weapon and ammo in another, pack contents laid out where you can see them. Check your gear list against your actual pile. Charge your headlamp, phone, and any electronic calls. Set your hunting clothes in a sealed scent-free bag or tote. If you washed them in Buck Stop Scent Stop Laundry Soap earlier in the week, they should already be stored this way. Set two alarms -- you cannot afford to oversleep opening morning.

**The Night Before (9:00 PM)**
Get to bed early. A tired hunter makes bad decisions, moves too much, and loses focus during the critical dawn hour. Eat a solid dinner and hydrate well.

**Morning (4:30 AM)**
Wake up and take a scent-free shower from head to toe using Scent Stop Body Wash. Wash your hair, face, underarms, hands, and feet thoroughly. Do not apply deodorant, aftershave, or any scented product. Towel off with a clean towel that was washed in Scent Stop Laundry Soap.

**Morning (4:45 AM)**
Eat a quiet, simple breakfast. Peanut butter on bread, granola bar, banana -- nothing that will make you gassy in the stand and nothing you need to cook with strong aromas. Fill a thermos if you want coffee, but consider skipping it your first time out so you are not dealing with the need to relieve yourself two hours into the sit.

**At the Truck (5:15 AM)**
Get dressed outside or in a garage, not inside your house where cooking smells and household odors will contaminate your clothing. Pull your base layer, mid-layer, and outer layer from the sealed bag and dress in order. Once dressed, spray your entire body from hat to boots with Scent Stop Human Scent Eliminator. Give extra attention to your hat, back of neck, gloves, and boot soles. Apply cover scent to your boot soles if you have it -- this helps mask ground scent on the walk in.

**The Walk-In (5:30 AM)**
Walk slowly and deliberately. Use a red or green light headlamp on low power -- white light is far more disruptive to wildlife. Wear rubber boots that have been stored in a scent-free container. Step on rocks and hard ground when possible, avoid snapping branches, and do not walk through thick brush that will scrape and make noise. If you can hear yourself walking, you are walking too loud.

**In the Stand (5:45 AM)**
First thing: attach your safety harness to the tree. This is non-negotiable every single time. Pull up your weapon and gear on a haul line -- never climb with a loaded weapon or a bow in hand. Settle into your seat and organize your gear within arm's reach. Now deploy your scent: hang a wick soaked in Buck Stop attractant (Mate-Triks Doe-In-Heat during the rut or a food scent during early season) on a branch 15 to 20 yards out in a shooting lane. If you made a scent drag on the way in, hang that drag rag in a nearby tree.

**The Pre-Dawn Wait (5:45 AM - 6:15 AM)**
Sit still. Do not fidget, do not check your phone, do not rearrange your gear. Let the woods settle around you. The squirrels, birds, and other woodland sounds will resume within 15 to 20 minutes of your arrival, signaling to deer that everything is normal. Use this time to let your eyes adjust to the dark and identify the shooting lanes you cleared during pre-season scouting.

**First Light and the Morning Sit (6:15 AM - 9:30 AM)**
As legal shooting light begins, scan slowly with your eyes before raising binoculars. Look for horizontal lines (deer backs), ear flicks, and movement at ground level. Listen for footsteps in leaves. The first 90 minutes after dawn are the most productive window of the day during most of the season.

If you plan to call, wait at least 30 minutes after first light before your first vocalization. Start with a single soft doe bleat or contact grunt. Wait 20 to 30 minutes before calling again. If you see a deer approaching, stop calling and let scent and curiosity do the work.

**When a Deer Appears**
Freeze. Do not reach for your weapon until the deer's head is behind a tree or it is looking away. Move in slow motion. Get your weapon up and settle your sight on the vitals -- just behind the front shoulder, one-third of the way up the body. Wait for a broadside or slightly quartering-away shot. If the deer is facing you or quartering toward you, wait for it to turn. Take a deep breath, exhale halfway, and make a smooth trigger pull or release.

**After the Shot**
Mark the time. Note exactly where the deer was standing and where you last saw it. Sit down and wait a minimum of 30 minutes. If you suspect a gut shot (the deer hunched up and trotted away slowly), wait at least 4 to 6 hours. Climb down carefully, walk to the hit site, and mark it with flagging tape. Look for blood, hair, and any sign of the hit. Follow the blood trail slowly, marking each spot of blood as you go. If you lose the trail, return to the last blood and search in a widening grid pattern.

**Your First Recovery**
When you find your deer, take a moment. This is a milestone worth remembering. Then get to work: tag the animal per your state regulations, take photos, and begin the field dressing process. If you have not field dressed a deer before, watch a video the night before so you have a mental map. It is not complicated, but it goes much smoother when you have seen it done at least once.

**The Most Important Thing:** Be patient. Most first-time hunters do not see a deer on their first sit, and that is completely normal. The experience of being in the woods at dawn, watching the forest wake up, and learning to sit still and observe -- that is the foundation every successful hunter is built on.`,
  },
  {
    slug: 'deer-calls-scents-combo-guide',
    image: '/images/articles/calls-scents-combo.jpg',
    title: 'Deer Calls and Scents: The Complete Combo Guide',
    excerpt:
      'Which calls work with which scents in each season. The two-tool system that brings bucks in on a string.',
    category: 'Scent Strategy',
    content: `Calls and scents are two halves of the same system. A call without scent backup is like a phone ringing in an empty house -- it gets attention but nothing is there when the buck shows up to investigate. A scent setup without any vocalization relies entirely on a deer walking through your scent stream by chance. When you combine the right call with the right scent for the time of year, you create a multi-sensory illusion that mature bucks cannot resist.

**Early Season (September through Early October)**
Deer are calm, social, and focused on food. Aggressive tactics will push them out of the area.

*Calls:* Soft doe bleats and social contact grunts only. Think of these as casual conversation -- a doe letting other deer know she is nearby and feeding contentedly. One or two soft bleats every 30 to 45 minutes is plenty. A bleat can is the simplest tool for this and nearly foolproof for beginners.

*Scents:* Food-based attractants are your primary tool. Apple, acorn, and sweet corn scents placed near feeding areas match the natural environment and draw deer in without raising suspicion. For mock scrapes, use a non-rutting buck urine to start building a communication point without the aggression of rutting scents. Save the estrus for later.

*Combo:* Soft doe bleat plus food attractant at a field edge. Low-key, natural, effective.

**Pre-Rut (Mid-October through Early November)**
Bucks are breaking bachelor groups, sparring, and making scrapes. Testosterone is rising and they are starting to check for the first estrus does. This is when scent-and-call combos start producing serious encounters.

*Calls:* Tending grunts (a rhythmic, low-pitched series of grunts that imitates a buck following a doe) are money during the pre-rut. Light rattling sequences of 30 to 60 seconds simulate sparring matches and trigger curiosity in nearby bucks. Keep rattling light -- you are imitating young bucks testing each other, not a full-blown fight.

*Scents:* Mock scrapes with Buck Stop Ruck'n Buck or Rutting Buck Urine create territorial pressure. Nearby bucks will work your scrapes to assert dominance. Add a drag rag with Mate-Triks Doe-In-Heat on the last 100 yards of your walk-in to suggest a doe is in the area ahead of the main estrus cycle. Bucks will investigate even a hint of early estrus.

*Combo:* Tending grunt plus light rattling plus Ruck'n Buck mock scrape plus Doe-In-Heat drag rag. You are telling a story: there is a buck tending a hot doe, and he has been working this scrape. Any nearby buck with a competitive streak will come to see what is happening.

**Peak Rut (November)**
The gloves are off. Bucks are running does, fighting rivals, and covering miles of ground. They are less cautious and more responsive to aggressive tactics than at any other time of year.

*Calls:* Aggressive rattling (1 to 3 minutes of loud, sustained antler crashing), snort-wheezes (the ultimate challenge call that says "I am the dominant buck here and I am ready to fight"), and estrus bleats (loud, drawn-out bleats that imitate a doe in heat). Combine them in sequences: rattle hard for a minute, pause, hit a snort-wheeze, pause, follow with a long estrus bleat.

*Scents:* Pull out your strongest attractants. Use Buck Stop 200 PROOF or Mate-Triks Doe-In-Heat on a drag rag from at least 200 yards out, leading directly to your stand. Deploy scent wicks at multiple shooting lanes. Refresh every 2 to 3 hours.

*The Double-Drag Technique:* Tie one drag rag to your left boot soaked in Doe-In-Heat and another to your right boot soaked in Ruck'n Buck. This creates two distinct scent trails -- one saying "hot doe walked through here" and the other saying "rival buck is on her trail." A mature buck hitting these two trails will follow them straight to your setup. This is one of the most effective scent techniques we have ever field-tested.

*Combo:* Aggressive rattling plus snort-wheeze plus estrus bleat plus double-drag technique plus scent wicks at shooting lanes. Maximum sensory pressure.

**Post-Rut (Late November through December)**
Most does are bred. Bucks are exhausted, beaten up, and cautious again. But some does (and many doe fawns) enter a second estrus cycle about 28 days after the first, and bucks know it.

*Calls:* Dial it way back. Soft doe bleats only, and use them sparingly -- one every 30 to 45 minutes at most. No rattling, no aggressive grunting. Bucks have been pressured for weeks and loud calling will push them away rather than pull them in.

*Scents:* Food-based lures become effective again as deer focus on replenishing energy. A subtle doe estrus scent (not heavy application) can still work because bucks are actively seeking those late-cycling does. Buck Beads placed in a scrape provide low-maintenance, slow-release scent that keeps working without requiring you to revisit and refresh.

*Combo:* Occasional soft bleat plus food attractant near a food source plus light estrus at a scrape. Subtle, patient, and focused on where deer are already going.

**The Key Rule Across All Seasons: Start Subtle, Escalate**
No matter what phase of the season you are in, always start with the lightest approach and escalate only if the situation calls for it. Overcalling and over-scenting are far more common mistakes than being too conservative. Let the conditions, the deer behavior you are observing, and the time of year guide your aggression level. When in doubt, do less.`,
  },
  {
    slug: 'food-plot-basics',
    image: '/images/articles/scrapelines.jpg',
    title: 'Food Plot Basics: What to Plant and When',
    excerpt:
      'Food plots are the single best investment you can make in your hunting property. Learn what to plant, when to plant it, and how to turn a small clearing into a deer magnet that holds bucks all season long.',
    category: 'Land Management',
    content: `If you want to hold more deer on your property, see bigger bucks, and create reliable ambush points, food plots are the answer. A well-planned food plot does three things at once: it provides high-quality nutrition that grows healthier deer and bigger antlers, it attracts deer from surrounding properties onto yours, and it gives you a predictable location to hunt. No other single improvement to your land delivers that kind of return.

**Why Food Plots Matter**
The average whitetail needs roughly 6 to 8 pounds of forage per day, and bucks need even more during antler growth season and the pre-rut energy buildup. Native browse alone rarely provides the protein and mineral content deer need to reach their genetic potential. A food plot with 25 to 35 percent protein content -- achievable with clover and soybeans -- can make a measurable difference in antler size and body weight within two to three years. Beyond nutrition, food plots create a reason for deer to stay on your property instead of drifting to the neighbor's corn field. A doe group that beds near a reliable food source will anchor to your land, and where the does are, the bucks will follow.

**Spring and Summer Plots**
Warm-season food plots are your nutritional workhorses. These are the plots that feed deer through the months when antlers are growing and does are nursing fawns. The best spring and summer plantings include:

- **Clover** -- The king of perennial food plots. White clover and crimson clover provide 20 to 25 percent protein and can last 3 to 5 years with minimal maintenance. Plant in early spring after the last frost. Clover fixes nitrogen in the soil, which means it actually improves your ground over time. Mow it to 4 to 6 inches twice during summer to keep it tender and productive.
- **Soybeans** -- Deer love soybeans at every stage of growth, from tender young leaves in summer to mature pods in fall. Soybeans provide 25 to 35 percent protein. The downside is they require larger plots (at least 2 to 3 acres) or deer will eat them to the ground before the plants can establish.
- **Lablab and Cowpeas** -- Excellent warm-season legumes that thrive in southern heat. Both tolerate poor soil better than soybeans and provide high protein through summer.
- **Chicory** -- A perennial that pairs perfectly with clover. Chicory has a deep taproot that pulls minerals from the subsoil, and deer graze it heavily from May through September.

**Fall and Winter Plots**
Fall plots are your hunting plots -- these are what draw deer into range during bow season, the rut, and the critical late season. The top fall plantings include:

- **Brassicas** -- Turnips, radishes, and rape are the superstars of fall food plots. Brassicas produce massive amounts of forage and become sweeter after the first hard frost, which is exactly when you want deer hitting your plot the hardest. Deer eat the leafy tops first, then dig up the bulbs in late season when other food is scarce. Plant brassicas 60 to 90 days before your first expected frost.
- **Winter Wheat and Oats** -- These cereal grains germinate fast and provide green forage when everything else is brown. Oats are preferred early in fall, while winter wheat carries through to spring. Plant by mid-September in most northern states.
- **Cereal Rye** -- The most cold-tolerant option and a great late planting choice if you missed the window for other crops. Rye germinates in cool soil and provides green forage well into winter.
- **Annual Clover** -- Crimson clover planted in late summer provides fall forage and dies off over winter, making it a good companion to brassicas.

**The Kill Plot Formula**
A kill plot is a small food plot -- typically a quarter acre to half an acre -- designed specifically as an ambush point near your stand. The best kill plot mix for most of the whitetail range is a simple brassica and oat blend: 4 pounds of turnip seed, 2 pounds of radish seed, and 50 pounds of oats per acre. This mix germinates fast, provides early green forage from the oats, and delivers late-season attraction from the brassicas. Place your kill plot in a natural opening or clearing within 80 to 100 yards of your stand, with the prevailing wind carrying your scent away from the plot.

**Soil Testing and pH**
Before you plant anything, get a soil test. This is the most overlooked step in food plot management and the number one reason plots fail. A soil test from your local agricultural extension office costs $10 to $15 and tells you exactly what your soil needs. Most food plot species perform best in a pH range of 6.0 to 7.0. If your soil is acidic (below 6.0), you need lime -- and lime takes 3 to 6 months to fully adjust pH, so apply it well before planting. A plot planted in soil with a pH of 5.0 will produce a fraction of the forage that the same seed would produce at 6.5. Do not skip this step.

**Plot Size Recommendations**
For destination plots designed to feed deer and hold them on your property, aim for 1 to 3 acres. These larger plots can withstand heavy browse pressure without being eaten to nothing. For kill plots near stand locations, a quarter acre to half an acre is ideal -- small enough that deer feeding in the plot are within bow range, and the entire plot is a shooting lane.

**The Buck Stop Edge**
Here is a tactic that ties your food plot directly to your stand setup: place Buck Stop food-scented Buck Beads -- Sweet Corn or Sugar Beet varieties -- along the edge of your food plot closest to your stand. Deer approaching the plot will encounter the concentrated scent trail first, pulling them past your stand before they reach the open plot where shot opportunities become more difficult. This gives you a 15 to 25 yard shot on a deer that is focused on food scent and walking confidently, rather than a 60-yard Hail Mary at a deer standing in the middle of a field.`,
  },
  {
    slug: 'food-plot-management-calendar',
    image: '/images/articles/scouting.jpg',
    title: 'Seasonal Food Plot Management Calendar',
    excerpt:
      'A month-by-month guide to food plot management from soil testing in January to late-season ambush hunts in December. Know exactly what to do and when to do it for maximum deer attraction.',
    category: 'Land Management',
    content: `Managing a food plot is not a one-weekend project. The hunters who get the most out of their plots treat them as a year-round commitment, and the calendar below breaks down exactly what you should be doing each month to keep your plots productive and your deer herd growing.

**January and February: Planning Season**
This is your desk-work phase. Order soil test kits from your county agricultural extension office and pull samples from every plot location you plan to plant. Soil tests take 2 to 4 weeks to process, and you need those results before you buy a single bag of seed or lime. While you wait, study aerial photos and topo maps of your property to identify new plot locations. Look for natural openings, old logging roads, and south-facing slopes that get good sunlight. Make a seed list and budget for the year. Order seed early -- popular blends sell out by spring, and buying direct from seed companies is usually cheaper than retail.

Review your trail camera data from the previous fall and winter. Which plots got the most use? Which ones did deer avoid? Were there plots that got hammered early but abandoned by November? This data tells you what is working and what needs to change. If a plot was ignored, it is probably a location problem, not a seed problem. If a plot was destroyed by early browse pressure, it was either too small or too close to bedding cover.

**March and April: Soil Prep**
As soon as the ground thaws and dries enough to work, it is time to address your soil test results. Apply lime to any plot with a pH below 6.0 -- and apply it now, because lime needs 60 to 90 days to take full effect. A common mistake is liming and planting on the same day; the lime has not had time to change the pH, so your seed is still growing in acidic soil. Spread fertilizer according to your soil test recommendations. A general-purpose 13-13-13 fertilizer works as a baseline if you do not have specific recommendations. Spray any existing vegetation in your plots with glyphosate to kill weeds and grass before they get established. A clean seedbed is critical for good germination.

**May and June: Warm-Season Planting**
Once soil temperatures reach 60 degrees Fahrenheit consistently, plant your warm-season plots. Clover should go in the ground in May for most of the whitetail range -- it needs moisture and moderate temperatures to establish. If you are planting soybeans, wait until soil temps hit 65 to 70 degrees. Broadcast clover seed at 8 to 10 pounds per acre and cultipack or roll the seedbed to ensure good seed-to-soil contact. Soybeans should be drilled or planted in rows at 50 to 60 pounds per acre.

If you have established perennial clover plots from previous years, mow them now to a height of 4 to 6 inches. Mowing removes old growth, stimulates tender new shoots, and keeps weeds from overtaking the clover. Plan to mow perennial plots twice during summer -- once in late May and again in mid-July.

**July and August: Fall Plot Prep**
This is the most critical window of the year for hunters who rely on fall food plots. Begin preparing your fall plot seedbeds in mid-July. Spray existing vegetation with glyphosate and let it die for 10 to 14 days. Disk or till the dead vegetation into the soil. Apply lime and fertilizer based on your soil tests. Let the seedbed settle for a week, then spray again to kill any weed seeds that germinated after tilling.

Plant fall plots between August 1 and September 1 in most northern states. Timing varies by latitude -- southern hunters can plant as late as mid-September. The target is getting your brassicas 60 to 90 days of growth before the first hard frost. For a standard kill plot blend, broadcast 4 pounds of turnip seed, 2 pounds of radish seed, and 50 pounds of oats per acre. Cultipack after seeding. If rain is in the forecast within the next 3 to 5 days, your timing is perfect.

**September: Scouting the Plots**
Your fall plots should be emerging by early September. Walk the edges and check germination rates, but stay out of the interior to avoid leaving scent. This is the time to set trail cameras on the plot edges facing the approach trails deer are using to enter the plot. Identify which corners and edges deer are entering from -- this tells you where to position your stands.

Begin trimming shooting lanes and confirming stand placements near your kill plots. Every hour you spend in the plot area now is an hour of disturbance you are avoiding during the season. Get your work done early and then stay out. Check cameras during midday and take the long way around to avoid walking through the plot.

**October: Peak Attraction Begins**
Your fall plots are hitting their stride. Oats and cereal grains are providing green forage that deer are hammering in the early season. Brassica tops are lush and growing. Trail cameras should be showing increasing activity, especially during the last hour of daylight. Bucks are in pre-rut mode, cruising plot edges at dawn and dusk looking for does that are feeding in the open.

Hunt your food plot stands carefully -- do not burn them with bad winds or sloppy entry routes. Save your best kill plot setups for prime conditions: a cold front, a northwest wind, and a morning sit with a clean entry route that keeps you downwind of the plot. During October, deer are still on a feed-to-bed pattern, so morning hunts near food plots are best focused on catching deer returning to bedding areas adjacent to the plot.

**November: The Rut and Your Plots**
During the rut, food plots serve a different purpose. Does continue to feed in plots on a predictable schedule, and bucks know it. A mature buck will cruise the downwind edge of a food plot at dawn and dusk, scent-checking for does in estrus without ever stepping into the open. Set your stands 50 to 75 yards downwind of the plot edge to intercept these cruising bucks.

The best rut hunts over food plots are all-day sits. Bucks can show up at any hour as they move between doe groups. If you are hunting a plot edge during the rut, deploy doe estrus scent between your stand and the plot to pull cruising bucks within range.

**December and January: Late Season Is Food Plot Season**
This is when food plots earn their keep. After the rut, deer are in an energy deficit. Bucks have lost 20 to 30 percent of their body weight and does are preparing for winter. Every deer on your property is focused on one thing: calories. Brassicas have been hit by frost and are now at peak sweetness -- the starches in the bulbs have converted to sugars, and deer will dig them out of the ground like candy. A standing brassica plot in December is the single best ambush location in all of deer hunting.

Hunt afternoon sits during late season. Deer will move to food sources 1 to 2 hours before dark and feed until after shooting light ends. Set up on the downwind edge of your food plot and wait.

**The Buck Stop Late-Season Play**
During late season, pair your food plot ambush with Buck Stop Sweet Corn or Sugar Beet Buck Beads placed along the approach trail deer use to reach the plot. Deer heading to the food plot will encounter the concentrated food scent first, slowing them down and pulling them into your shooting lane before they reach the open plot. This is especially effective on kill plots where the approach trail passes within 20 yards of your stand. The combination of a standing brassica plot and a scent trail of Buck Beads on the approach route is as close to a guaranteed late-season encounter as you will find.`,
  },
  {
    slug: 'food-plot-mistakes',
    image: '/images/articles/mistakes.jpg',
    title: '5 Food Plot Mistakes That Cost You Deer',
    excerpt:
      'You planted the plot, bought the seed, and did the work. But if you are making any of these five common mistakes, your food plot might be hurting your hunting more than helping it.',
    category: 'Land Management',
    content: `Food plots are one of the best tools in a deer hunter's arsenal, but they are not foolproof. Every year, hunters spend hundreds of dollars on seed, fertilizer, and equipment only to watch their plots underperform -- or worse, watch deer use the plot on a pattern that makes them unhuntable. Here are the five most common food plot mistakes and how to fix each one before this season.

**Mistake 1: Planting Too Close to Your Stand**
This is the most common mistake we see, and it is the hardest to fix once your plot is established. Many hunters place their food plot directly beneath or immediately adjacent to their tree stand, thinking closer equals better. The problem is twofold. First, deer that feed in a plot 15 yards from your stand will eventually pattern your entry and exit. They will hear you climbing in the dark, smell residual scent on the ladder, or catch movement as you shift in your seat. A pressured doe group will simply start feeding after dark, and the bucks will follow their lead.

Second, a food plot directly under your stand means deer are looking up at you while they feed. Whitetails that are standing still in an open plot with their heads down are hyper-alert to overhead movement. Every time you raise your bow or shoulder your rifle, you are silhouetted against the sky.

The fix: place your food plot 50 to 100 yards from your stand, not directly beneath it. Position your stand along the approach trail deer use to reach the plot, between their bedding area and the food source. This way, you are intercepting deer as they walk through cover on their way to the plot, not trying to draw on a deer staring at you from 15 yards in the open. Plan your entry route so you can access your stand without crossing the plot or walking through the feeding area. Use terrain features -- ridges, creek bottoms, thick cover -- to screen your approach.

**Mistake 2: Skipping Soil Tests**
A soil test costs $10 to $15 through your county extension office and takes five minutes to collect. Yet the majority of food plot hunters skip this step every single year and wonder why their plots look thin, yellow, and chewed to nothing by October.

Here is what happens when you skip the soil test: you buy premium seed, spend a weekend prepping the ground, plant at the right time, and get adequate rain. But your soil pH is 5.2 instead of the 6.5 your clover needs. The seed germinates, the plants emerge, and then they stall. Growth is weak, protein content is low, and the plot produces a fraction of the forage it should. You blame the seed company. You blame the weather. But the problem was in the dirt before you ever opened the bag.

The fix: test every plot location, every year. Soil conditions change over time, especially if you are adding lime and fertilizer. Most food plot species perform best between 6.0 and 7.0 pH. If your soil is below 6.0, apply agricultural lime at the rate your soil test recommends -- typically 1 to 3 tons per acre. And apply it at least 60 to 90 days before planting, because lime takes time to react with the soil. Liming and planting on the same day is throwing money away.

**Mistake 3: Planting Only One Thing**
A monoculture food plot -- all clover, all soybeans, or all brassicas -- provides attraction during one window of the season and sits empty the rest of the year. Clover is great from May through September but goes dormant in winter. Soybeans are browsed heavily in summer but the mature pods are gone by November. Brassicas do not become attractive until after the first frost. If you plant only one species, you have a food plot that works for two or three months and does nothing for the other nine.

The fix: plant for diversity across plots and across seasons. Your spring planting should include a perennial clover base with chicory mixed in for summer attraction. Your fall planting should combine a cereal grain like oats or winter wheat (early attraction) with brassicas like turnips and radishes (late attraction). This way, deer have a reason to visit your plots from April through January. If you only have room for one plot, use a blended mix: 4 pounds of turnip, 2 pounds of radish, 50 pounds of oats, and 4 pounds of crimson clover per acre gives you four species with staggered attraction windows in a single planting.

**Mistake 4: Making Plots Too Big**
This one is counterintuitive, but bigger is not always better when it comes to food plots you plan to hunt over. A 5 to 10 acre food plot is great for herd nutrition and holding deer on your property, but it is a terrible hunting plot. Here is why: when a deer steps into a 10-acre field, it walks to the center where it feels safe, surrounded by open space where it can see predators approaching from any direction. That deer is now 150 yards from every edge of the plot and well beyond effective bow range. Even rifle hunters struggle with 10-acre plots because deer feel comfortable enough to feed in daylight only when they are deep in the interior.

The fix: separate your destination plots from your kill plots. Destination plots can be 1 to 5 acres -- these are designed for nutrition, herd health, and holding deer on your property. They do not need to be huntable. Kill plots should be a quarter acre to a half acre, tucked into cover near bedding areas, with shooting lanes that cover the entire plot. A quarter-acre kill plot planted in brassicas and oats, shaped like an hourglass or an L so that no point in the plot is more than 30 yards from the edge, is one of the deadliest setups in deer hunting. Deer feel comfortable stepping into a small plot surrounded by cover, and every square foot of it is within range.

**Mistake 5: Ignoring Approach Routes**
You can have the perfect food plot -- right species, right soil, right size, right location -- and still never kill a deer over it because you cannot get to your stand without blowing the hunt. This is the mistake that ruins more food plot setups than any other, and it is the easiest to prevent with a little planning.

Every time you walk to your stand, you leave a scent trail. If that trail crosses the path deer use to approach the food plot, they will hit your scent, stop, and either circle downwind or turn around. Even with a full scent elimination routine, a mature doe or buck will detect trace human odor on a trail you walked 30 minutes earlier. If you access your stand by walking along the food plot edge, through the feeding area, or across the main deer trail, you are educating every deer in the area.

The fix: plan your entry and exit routes before you hang the stand, not after. Study the prevailing wind direction for your plot location and choose a route that keeps your scent blowing away from both the plot and the trails deer use to reach it. Use terrain features as screens -- walk along creek bottoms, behind ridges, and through thick cover that blocks your silhouette. Cut a dedicated access trail that you clear of noisy debris like dry leaves and sticks. Consider planting a strip of tall grass (switchgrass or Egyptian wheat) between your access trail and the food plot as a visual screen.

When approaching food plot stands, use Buck Stop Natural Earth cover scent on your boot soles to mask ground scent along your trail. At the plot edge closest to your stand, hang scent wicks treated with Gland-U-Lure along the tree line to create a focal point that draws deer within your shooting lane. The combination of a clean entry route, wind-conscious stand placement, and a scent focal point at the plot edge turns a good food plot setup into a great one.

**The Bottom Line**
Food plots are powerful tools, but only when the details are right. Test your soil, diversify your plantings, control your plot size, separate your stand from the plot, and plan your approach like your season depends on it -- because it does. The hunters who kill mature bucks over food plots year after year are not planting magic seed. They are managing every variable from dirt to wind to the trail they walk in on.`,
  },
];

export default function HuntingTipsPage() {
  return (
    <>
      <HeroSection
        title="Hunting Tips"
        subtitle="Field-Tested Tactics from 70 Seasons in the Woods"
        variant="page"
      />

      <AuthorBio
        name="Brian Johansen"
        title="Owner & Master Scent Formulator"
        initials="BJ"
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 bg-white">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-forest transition-colors">Home</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-forest font-medium" aria-current="page">Hunting Tips</li>
          </ol>
        </nav>
      </div>

      {/* Article Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="articles-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="articles-heading" className="sr-only">Hunting Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ExpandableArticle key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Scent Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Master Your Scent Strategy
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Learn which scents to use, when to use them, and how to apply them for
            maximum effectiveness in our comprehensive scent guide.
          </p>
          <Link
            href="/scent-guide"
            className="inline-block bg-amber text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
          >
            Learn What the Pros Know
          </Link>
        </div>
      </section>
    </>
  );
}
