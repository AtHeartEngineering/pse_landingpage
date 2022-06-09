import globe from "../images/website.svg";
import github from "../images/github.svg";
import discord from "../images/discord.svg";
import twitter from "../images/twitter.svg";
import telegram from "../images/telegram.svg";
import link from "../images/box_arrow_out.svg";
import "./ProjectCard.css";
import ColorHash from "color-hash";

export interface ProjectCardProps {
  name: string;
  short_name?: string;
  description: string | string[];
  long_description?: string | string[];
  image?: string;
  links?: Links[];
  renderBanner?: boolean;
}

interface Links {
  github?: string;
  website?: string;
  discord?: string;
  twitter?: string;
  telegram?: string;
}

function renderLink(url: string, source: string, icon: string, button: boolean = false, text: boolean = false): any {
  let RgExp = new RegExp('^(?:[a-z]+:)?//', 'i');
  if (!RgExp.test(url)) {
    url = '//' + url;
  }
  if (!button) {
    return (
      <div className="link" key={url}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img className="icon" src={icon} alt={source} />
          {text ? <div className="link-title">{source}</div> : null}
        </a>
      </div>
    );
  } else {
    return (
      <div className="link" key={url}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ backgroundColor: `var(--${source})` }}
        >
          <img className="icon" src={icon} alt={source} />
          {text ? <div className="link-title">{source}</div> : null}
        </a>
      </div>
    );
  }
}

function renderBanner(name: string): any {
  let hueRange = { min: 45, max: 360 };
  let colorHashText = new ColorHash({ hue: hueRange, lightness: [0.8, 0.9] }).hex(name);
  let colorHashBG = new ColorHash({
    hue: hueRange,
    lightness: [0.35, 0.4],
    saturation: [0.65, 0.85, 1],
  }).hex(name);
  return (
    <svg height="150px" width="350px" style={{ backgroundColor: colorHashBG }} className="card-img-top">
      <text
        textAnchor="middle"
        x="50%"
        y="58%"
        fill={colorHashText}
        style={{ fontSize: "2.5rem", fontStyle: "italic" }}
      >
        {name}
      </text>
    </svg>
  );
}

function renderDescription(description: string | string[]): any {
  if (typeof description === "string") {
    return <p className="card-text-project">{description}</p>;
  }
  return description.map((text: string, index: number) => {
    return (
      <p className="card-text-project" key={index}>
        {text}
      </p>
    );
  });
}

function ProjectCard(props: ProjectCardProps) {
  const docLinks = props.links
    ? props.links.map((link) => {
      if (link.github) {
        return renderLink(link.github, "github", github);
      } else if (link.website) {
        return renderLink(link.website, "website", globe);
      } else {
        return null;
      }
    })
    : null;

  const socialLinks = props.links
    ? props.links.map((link) => {
      if (link.discord) {
        return renderLink(link.discord, "discord", discord);
      } else if (link.twitter) {
        return renderLink(link.twitter, "twitter", twitter);
      } else if (link.telegram) {
        return renderLink(link.telegram, "telegram", telegram);
      } else {
        return null;
      }
    })
    : null;

  let img = (() => {
    try {
      if (props.image) {
        let imageSource;
        if (props.image.startsWith("http")) {
          imageSource = props.image;
        } else {
          imageSource = require(`../images/${props.image}`);
        }

        return <img className="card-img-top" src={imageSource} alt={props.name} />;
      } else if (props.renderBanner == true || props.renderBanner == undefined) {
        return renderBanner(props.short_name || props.name);
      } else {
        return null;
      }
    } catch (e) {
      if (props.renderBanner == true || props.renderBanner == undefined) {
        return renderBanner(props.short_name || props.name);
      } else {
        return null;
      }
    }
  })();

  return (
    <div className="card border border-dark">
      {img}
      <div className="card-body">
        <div style={{ display: 'flex' }}>
          <div className="card-title">{props.name}</div>
          <div style={{ width: '0.8125rem' }} />
          <img src={link} />
        </div>
        {renderDescription(props.description)}
      </div>
      <div className="card-footer">
        <div className="docs-links">
          {docLinks}
        </div>
        <div className="social-links">
          {socialLinks}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;