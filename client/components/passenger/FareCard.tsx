interface Props {
  normalFarePaisa: number;
  poolFarePaisa: number;
}

export default function FareCard({
  normalFarePaisa,
  poolFarePaisa,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm text-gray-500">
        Estimated Fare
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">
            Normal
          </p>

          <p className="text-xl font-bold">
            ৳{normalFarePaisa / 100}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Pool
          </p>

          <p className="text-xl font-bold">
            ৳{poolFarePaisa / 100}
          </p>
        </div>
      </div>
    </div>
  );
}