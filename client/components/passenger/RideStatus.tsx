import Badge from "@/components/ui/Badge";

import type {
  RideStatus as RideStatusType,
} from "@/types/ride";

interface Props {
  status: RideStatusType;
}

export default function RideStatus({
  status,
}: Props) {
  const variant =
    status === "COMPLETED"
      ? "success"
      : status === "CANCELLED"
      ? "danger"
      : status === "STARTED"
      ? "warning"
      : "default";

  const label = status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );

  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  );
}