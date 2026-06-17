---
title: "How I moved from AWS to my homelab and cut the bill to almost zero"
description: "What changed when I moved my services out of AWS, what stayed, and what I learned while rebuilding everything on Arda."
publishDate: 2026-06-17
translationKey: "aws-to-homelab"
draft: false
---

## TL;DR

- I was paying around 40-50 EUR every month to expose personal projects and run
  Passbolt, and that cost had started to feel unjustified.
- More importantly, I wanted to get rid of subscriptions and replace the SaaS
  tools I used with self-hosted alternatives built on open core or free
  software whenever that was realistic.
- The turning point did not come from a cloud comparison spreadsheet. It came
  from a much simpler idea: rescuing an old PC and giving it a second life.
- The project became much more than a migration. I tore the machine down,
  cleaned it, upgraded it, installed headless Debian and rebuilt my stack from
  there.
- I know a homelab is not the answer to everything, but it forces you to
  understand what you are really building.

## Motivation

For a while I was paying somewhere between 40 and 50 euros every month to
expose my personal projects and manage my passwords in Passbolt. It was not a
catastrophic amount of money, but it was high enough to annoy me every time I
saw the charge.

But the money, while important, was not the only reason, and probably not even
the most interesting one. What really pulled me in was the idea of removing
subscriptions and replacing the SaaS tools I relied on with self-hosted
alternatives whenever there was a sensible open-core or free-software option
available. I did not want to stay dependent on external services just out of
habit.

The reason was fairly mundane: I wanted to run everything with Docker, and the
memory I needed pushed me into at least a 4 GiB EC2 instance. I cannot say with
full certainty that it was exactly a `t3.medium`, but that class of instance
matches what I remember: 2 vCPUs, 4 GiB of RAM, and a base monthly cost that
today sits around 30 USD before storage and other extras. Once you add the rest
of the bill, my real monthly total made perfect sense.

My original plan was not to build a server at home. It was much more boring:
find a cheaper cloud provider and move on. But then I ran into a sysadmin with
real systems experience who told me he reused old PCs as servers. What surprised
me was how confident he was about leaving them on all the time, as long as they
were well cooled. I am not claiming that as a universal truth, but it did open
the door to a much more interesting project in my head.

At that point, the goal stopped being "lower the bill" and became "take an old
machine apart, make it useful again, and turn it into the base layer for
self-hosted services under my own control."

## Applied solution

The solution started with hardware, not software. Instead of hunting for
another VM, I took the old PC apart completely to see what was worth keeping
and what was not. Before removing anything I photographed the whole machine so
I would have a wiring reference, then I pulled out the dedicated GPU, WiFi
card, sound card, RAM sticks, SSDs and the Arctic Freezer 13 cooler.

The cleaning was much more serious than a quick dust-off. I used compressed air
inside the case, cleaned the fans and cooler properly, removed the old thermal
paste with isopropyl alcohol and took the chance to inspect the motherboard and
capacitors. I also got rid of parts that no longer added any value: an obsolete
graphics card, the sound card, the WiFi card and other leftovers from a machine
built for a completely different purpose.

The starting machine was not useless junk either. Even though it is a 2012 PC,
it has a third-generation Intel i7, SSDs and, after the upgrade, 24 GB of RAM.
It is still old hardware, of course, but getting something with roughly those
characteristics in AWS would have pushed me into a much more expensive setup
than the modest instance I had been paying for just to keep things running.

At the same time, I decided to spend money only where it clearly improved the
result:

- a new case with better airflow
- a more efficient power supply, in my case a Corsair CX650 80+ Bronze
- 16 GB of DDR3 RAM across both slots for dual channel
- fresh thermal paste, while already planning to add a UPS soon

Once the machine was cleaned and upgraded, I rebuilt everything: motherboard,
power supply, Arctic Freezer 13 cooler with new paste, RAM, SATA SSDs and much
cleaner cabling than before. Before installing anything, I checked that the
machine POSTed correctly and reviewed BIOS settings such as boot order, time,
automatic power-on after outages and the option to enable Wake-on-LAN.

Then came the system itself. I installed Debian without a graphical interface
on the primary SSD, making it clear from day one that this was meant to be a
server, not a half-repurposed desktop machine. The second SSD was reserved for
persistent data, mounted through `fstab` and organized around Docker volumes.

Networking and operations were almost as important as the physical rebuild. I
assigned a static local IP, configured SSH with public keys and root disabled,
set up a basic firewall, installed Tailscale for private remote access and
built everything else on top of Docker. From there came Traefik, Cloudflare
Tunnel, Passbolt migrated from AWS, Uptime Kuma, Portainer, `pablesite.es`,
MoneyPlanner environments and several other services.

And of course, the nerdy touch had to be there. Instead of going with Greek
gods, which feel a bit overused for this kind of thing, I went straight to my
favorite fantasy world: Tolkien. The parent server became `Arda`, and from
there I started organizing the homelab as if they were its realms.

`Moria` ended up being Passbolt, because it is the place where only the people
who know the right word can enter. `Palantír` is almost too perfect for
monitoring. `Valinor` became the backup service, because an immortal land where
nothing is ever lost was too good a metaphor not to use. And `The Arkenstone`,
of course, became MoneyPlanner SaaS: the most valuable jewel in the whole set.

What I like most is that it did not stay as a one-off joke to name a few
containers. I am still genuinely surprised by how often a new service idea
comes with a Tolkien name that fits it almost perfectly. That is how names such
as `Narya` for LiteLLM, `Gandalf` for the Telegram bot, `The Council` for
Vikunja, `Rivendell` for Nextcloud, `Orthanc` for Home Assistant, `The Shire`
for Immich, `Glóin` for the invoice extractor, `Lórien` for the health and
sports project, or `Fëanor` for trading and backtesting started to appear.

So in practice, I did not just "move services out of AWS". I built an
environment I understood much better: hardware, operating system, storage,
networking, deployment, monitoring and backups. The savings were a consequence.
The real gain was context.

## Reflections

I already know a homelab is not the right answer for everything. I know it can
fail on the worst possible day. I know I should add a UPS soon, and that once
you start exposing more services you also inherit more networking and security
concerns that cloud platforms let you ignore for longer.

But that is exactly why I still think it is worth it. Building the whole thing
yourself, from cleaning parts and reassembling the PC to automating deployments
and running custom services, gives you a much wider technical perspective. It
forces you to touch layers that would otherwise stay hidden behind a cloud
dashboard, and it keeps you learning.

That is where Arda came from. Not as perfect infrastructure, but as understood
infrastructure. For a personal project, that matters much more to me than
continuing to pay for inertia.
