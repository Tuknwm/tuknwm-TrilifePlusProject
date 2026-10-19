import InsurancePage from "./InsuranceCalculator";



export function generateStaticParams() { return [{ type: "jiwa" }, { type: "kesehatan" }, { type: "mobil" }]; }



export default async function Page({ params }: { params: Promise<{ type: string }> }) {

  const { type } = await params;

  return <InsurancePage type={type} />;

}






