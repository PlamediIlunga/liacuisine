import { TeamMember } from "../types/TeamMember"

export default function TeamCardComponent({ member }: { member: TeamMember }) {
    return (
        <div className="about-team__card">
            <div className="about-team__photo-wrap">
                {member.src && <img src={member.src} alt={member.alt} />}
            </div>
            <h3 className="about-team__name">{member.name}</h3>
            <span className="about-team__role">{member.role}</span>
            <p className="about-team__bio">{member.bio}</p>
        </div>
    )
}