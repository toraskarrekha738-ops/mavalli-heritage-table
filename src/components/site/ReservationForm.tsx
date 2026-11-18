import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CLOSING_TIME,
  OPENING_TIME,
  PARTY_SIZES,
  createReservationSchema,
  localISODate,
  type Reservation,
} from "@/lib/reservation";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "phone" | "date" | "time" | "partySize" | "notes";
const EMPTY: Record<FieldName, string> = { name: "", email: "", phone: "", date: "", time: "", partySize: "", notes: "" };
const ORDER: FieldName[] = ["name", "email", "phone", "date", "time", "partySize", "notes"];

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="eyebrow text-[0.6rem] text-muted-foreground">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} className="mt-1.5 min-h-[1.1rem] text-xs text-destructive" aria-live="polite">
        {error}
      </p>
    </div>
  );
}

export function ReservationForm() {
  const uid = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [today, setToday] = useState<string | undefined>(undefined);
  const [confirmed, setConfirmed] = useState<Reservation | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setToday(localISODate()), []);

  const id = (f: FieldName) => `${uid}-${f}`;
  const set = (f: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    if (errors[f]) setErrors((er) => ({ ...er, [f]: undefined }));
  };
  const a11y = (f: FieldName) => ({
    id: id(f),
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": `${id(f)}-error`,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const schema = createReservationSchema(today ?? localISODate());
    const result = schema.safeParse({ ...values, notes: values.notes || undefined });
    if (!result.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = ORDER.find((f) => next[f]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setErrors({});
    setConfirmed(result.data);
  };

  const reset = () => {
    setConfirmed(null);
    setValues(EMPTY);
  };

  const prettyDate = confirmed
    ? new Date(`${confirmed.date}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
  const prettyTime = confirmed
    ? new Date(`2000-01-01T${confirmed.time}`).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
    : "";

  return (
    <>
      <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${uid}-note`} className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.name} className="sm:col-span-2">
          <input {...a11y("name")} className="field" autoComplete="name" maxLength={80} value={values.name} onChange={set("name")} placeholder="Your name" />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email}>
          <input {...a11y("email")} type="email" className="field" autoComplete="email" maxLength={255} value={values.email} onChange={set("email")} placeholder="you@example.com" />
        </Field>
        <Field id={id("phone")} label="Phone" error={errors.phone}>
          <input {...a11y("phone")} type="tel" className="field" autoComplete="tel" maxLength={20} value={values.phone} onChange={set("phone")} placeholder="+1 555 000 0000" />
        </Field>
        <Field id={id("date")} label="Date" error={errors.date}>
          <input {...a11y("date")} type="date" className="field" min={today} value={values.date} onChange={set("date")} />
        </Field>
        <Field id={id("time")} label="Time" error={errors.time}>
          <input {...a11y("time")} type="time" className="field" min={OPENING_TIME} max={CLOSING_TIME} step={900} value={values.time} onChange={set("time")} />
        </Field>
        <Field id={id("partySize")} label="Party size" error={errors.partySize} className="sm:col-span-2">
          <select {...a11y("partySize")} className="field cursor-pointer" value={values.partySize} onChange={set("partySize")}>
            <option value="">Select guests</option>
            {PARTY_SIZES.map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("notes")} label="Notes (optional)" error={errors.notes} className="sm:col-span-2">
          <textarea {...a11y("notes")} rows={3} maxLength={500} className="field resize-none" value={values.notes} onChange={set("notes")} placeholder="Occasion, seating preference…" />
        </Field>
        <div className="mt-4 flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p id={`${uid}-note`} className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            Preview only — submitting checks your details but does not send or store a reservation.
          </p>
          <Button type="submit" variant="brass" size="xl">
            Request Table
          </Button>
        </div>
      </form>

      <Dialog open={!!confirmed} onOpenChange={(o) => !o && setConfirmed(null)}>
        <DialogContent className="theme-paper paper-texture max-w-md rounded-lg border-border p-8 sm:rounded-lg">
          <DialogHeader>
            <CheckCircle2 className="h-8 w-8 text-leaf" aria-hidden />
            <p className="eyebrow pt-3 text-primary">Demo confirmation</p>
            <DialogTitle className="font-display text-4xl font-light">Looks good — but nothing was sent.</DialogTitle>
            <DialogDescription className="pt-2 text-base leading-relaxed">
              This site is a concept preview with no booking system. Your details passed validation, but no
              reservation was made, sent or saved.
            </DialogDescription>
          </DialogHeader>
          {confirmed && (
            <dl className="mt-2 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
              <div className="col-span-2">
                <dt className="eyebrow text-[0.58rem] text-muted-foreground">Name</dt>
                <dd className="mt-1 font-display text-xl">{confirmed.name}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.58rem] text-muted-foreground">Date</dt>
                <dd className="mt-1">{prettyDate}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.58rem] text-muted-foreground">Time · Guests</dt>
                <dd className="mt-1">
                  {prettyTime} · {confirmed.partySize}
                </dd>
              </div>
            </dl>
          )}
          <div className="mt-2 flex flex-wrap gap-3">
            <Button variant="brass" size="pill" onClick={() => setConfirmed(null)}>
              Close
            </Button>
            <Button variant="quiet" size="pill" onClick={reset}>
              Clear form
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
