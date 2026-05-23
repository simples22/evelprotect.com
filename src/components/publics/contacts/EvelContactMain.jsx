import EvelContactForms from "./EvelContactForms";
import EvelContactInfos from "./EvelContactInfos";

export default function EvelContactMain() {
  return (
    <section className="evelContactMain">
      <div className="evelContainer">
        <div className="evelContactLayout">
          <EvelContactForms />
          <EvelContactInfos />
        </div>
      </div>
    </section>
  );
}