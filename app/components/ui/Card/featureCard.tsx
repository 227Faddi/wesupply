import { LucideIcon } from "lucide-react";
import * as React from "react";
import style from "./feature.module.css"

interface CardProps {
    icon: LucideIcon;
    title: String;
    description: String
}

export function FeatureCard({
    icon,
    title = "", 
    description = ""

}: CardProps) {

    <div className="">

    </div>

    return (

        <div className={`${style.card} `}>
            {React.createElement(icon, { size: 35, className: style.icon })}
            <h1 className={style.h1}>{title}</h1>
            <p className={style.p}>{description}</p>

        </div>
    );
}