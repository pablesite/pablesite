---
title: "How I moved from AWS to my homelab and cut the bill to almost zero"
description: "What changed when I moved my services out of AWS, what stayed, and what I learned while rebuilding everything on Arda."
publishDate: 2026-06-17
translationKey: "aws-to-homelab"
draft: false
---

## TL;DR

- I was paying around 40-50 EUR every month to expose personal projects and
  keep my self-hosted password manager running, and that cost had started to
  feel pointless.
- More importantly, I wanted to get rid of subscriptions and replace some SaaS
  tools with self-hosted alternatives based on free software.
- The spark did not come from a benchmark or a random cloud comparison. It
  came from a much simpler idea: rescuing an old PC and giving it a second
  life.
- The project ended up being bigger than I had originally planned. I tore the
  machine down, cleaned it, upgraded it, installed Debian and rebuilt the
  homelab from there.
- I know a homelab is not the answer to everything, but it forces you to
  understand what you are really building.

## Motivation

For a while I was paying somewhere between 40 and 50 euros every month to
expose my personal projects and manage my passwords in Passbolt. It was not a
catastrophic amount of money, but it was high enough to annoy me every time I
saw the charge.

But the money, while important, was not the only reason, and probably not even
the most interesting one. What really pulled me in was the idea of removing
subscriptions and starting to run many of the SaaS tools I use myself,
whenever there was a reasonable free-software alternative.

The reason was fairly mundane: I wanted to run everything with Docker, and the
memory I needed pushed me into at least a 4 GiB EC2 instance. To use EC2, I
needed at least a `t3.medium`: 2 vCPUs and 4 GiB of RAM, with a base monthly
cost that today sits at around 30 USD before storage and other extras. Once
you translate that into a real bill, my 40-50 euros a month were perfectly
believable.

My original plan was not to build a server at home. It was much more boring:
find a cheaper cloud provider and carry on as usual. But then I ran into
someone with systems experience who told me he reused old PCs as servers. What
surprised me was how confidently he argued that a well-cooled PC does not
necessarily fail just because it stays on all the time, and that sometimes
machines suffer more from constant power cycles. I do not know how universally
true that is, but it did open a mental door for me.

Suddenly, the problem was no longer just about lowering a bill. It became
about bringing an old machine back to life, one I am especially fond of
because it used to be an absolute beast, taking it apart completely and turning
it into the base of an infrastructure of my own where I could gradually
replace SaaS tools with services under my control. That was the moment when the
project stopped being a simple cloud-to-cloud migration and became much more
interesting.

## Applied solution

The solution started with hardware. I took the old PC apart completely to see
what was worth saving and what was not. After thinking it through, I got rid of
the dedicated GPU it had. It was so obsolete that it was only going to add
heat and power consumption. The power supply, WiFi card, sound card, CD drive,
floppy drive, yes, really, floppy drive, and a few other bits also went out.

I kept the motherboard, the CPU, the RAM and two SATA SSDs. The cleaning was a
lot more serious than a quick dust-off. I cleaned everything properly, used
isopropyl alcohol on the electronics, went over the fans and cooler carefully
and removed the old thermal paste.

The starting machine was not useless junk either. Even though it is a 2012 PC,
it has a third-generation Intel i7 with a motherboard that was very solid for
its time. It is still old hardware, of course, but something with roughly
those characteristics in AWS would have pushed me toward a much more expensive
machine than the modest instance I had been paying for just to get by.

At the same time, I decided to spend 180 EUR only on the parts that genuinely
improved the result:

- a new case with better airflow
- an efficient power supply, in my case a Corsair CX650 80+ Bronze
- 16 GB of DDR3 RAM in two modules to take advantage of dual channel
- fresh thermal paste

Once the machine was clean and updated, it was time to build almost everything
back from scratch. The motherboard and CPU were the only block that was still
assembled. Everything else had to go back in: power supply, cooler with fresh
paste, RAM, the SATA SSDs and much tidier cabling than before. Before
installing anything, I checked that the BIOS booted and detected everything,
and I also reviewed the clock, which meant replacing the battery too, the
power-on behavior after an outage and the option to leave Wake-on-LAN
configured.

Then came the system itself. I installed Debian without a graphical interface
on the primary SSD, making it clear from day one that this was meant to be a
server, not a half-repurposed desktop machine. The second SSD was reserved for
persistent data, mounted through `fstab` and organized around Docker volumes.

Networking and operations were almost as important as the physical rebuild. I
assigned a static local IP, configured SSH with public keys and root disabled,
set up a basic firewall, installed Tailscale for private remote access and
built everything else on top of Docker. From there came Traefik, Cloudflare
Tunnel, Passbolt migrated from AWS, Uptime Kuma, `pablesite.es` and the first
version of my personal finance app.

And of course, the nerdy touch had to be there. Instead of going with Greek
gods, which feel a bit overused for this kind of thing, I went straight to my
favorite fantasy world: Tolkien. The parent server became `Arda`, and from
there I started organizing the homelab as if they were its realms.

`Moria` ended up being the password manager, because it is the place where only
the people who know the right word can enter. `Palantír` fits server
monitoring almost too well. `Valinor` became the backup service, because an
immortal land where nothing is ever lost was too good a metaphor not to use.
And `The Arkenstone`, of course, became the name of my personal finance app:
Smaug's most precious jewel as a metaphor for something just as patient and
valuable, building wealth.

What I like most is that it did not stay as a one-off joke to name a few
containers. I am still genuinely surprised by how often a new service idea
comes with a Tolkien-world name that fits it almost perfectly in a metaphorical
way. That is where `Narya` for LiteLLM and `Gandalf` for the Telegram bot that
will connect with Arda somehow come from, along with `The Council` for task
management, `Rivendell` for shared documents, `Orthanc` for home automation,
`The Shire` for family photos, `Glóin` for invoice extraction, `Lórien` for
the health and sports app, or `Fëanor` for the algorithmic trading system.

## Reflections

I already know a homelab is not the right answer for everything. I know it can
fail on the worst possible day. I know I should add a UPS soon, and that once
you start exposing more services you also inherit more networking and security
concerns that cloud platforms let you ignore for longer.

But that is exactly why I still think it is worth it. Building the whole thing
yourself, from cleaning parts and reassembling the PC to automating deployments
and running custom services, gives you a much wider technical perspective. It
forces you to touch layers that would otherwise stay hidden behind some admin
panel, and above all it keeps you current and learning.

I am honestly very happy with Arda. I no longer pay AWS out of inertia. Now I
pay Octopus for the server's power consumption instead.
