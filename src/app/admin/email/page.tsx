"use client";

import { useEffect, useState, useActionState, useCallback } from "react";
import {
  sendCustomEmail,
  getEmails,
  markEmailRead,
  markEmailUnread,
} from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type EmailItem = {
  _id: string;
  to: string;
  fromName: string;
  subject: string;
  body: string;
  status: string;
  read: boolean;
  error?: string;
  createdAt: string;
};

type SendState = { success: boolean; error?: string; id?: string } | null;

async function submitEmail(
  _prev: SendState,
  formData: FormData
): Promise<SendState> {
  return sendCustomEmail(formData);
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminEmailPage() {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [selected, setSelected] = useState<EmailItem | null>(null);
  const [view, setView] = useState<"inbox" | "compose">("inbox");
  const [loading, setLoading] = useState(true);
  const [state, action, isPending] = useActionState(submitEmail, null);

  const loadEmails = useCallback(async () => {
    setLoading(true);
    const data = await getEmails();
    setEmails(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadEmails();
  }, [loadEmails]);

  // Refresh list after successful send
  useEffect(() => {
    if (state?.success) {
      loadEmails();
    }
  }, [state, loadEmails]);

  const unreadCount = emails.filter((e) => !e.read).length;

  async function handleSelect(email: EmailItem) {
    setSelected(email);
    setView("inbox");
    if (!email.read) {
      await markEmailRead(email._id);
      setEmails((prev) =>
        prev.map((e) => (e._id === email._id ? { ...e, read: true } : e))
      );
    }
  }

  async function handleToggleRead(email: EmailItem) {
    if (email.read) {
      await markEmailUnread(email._id);
      setEmails((prev) =>
        prev.map((e) => (e._id === email._id ? { ...e, read: false } : e))
      );
      if (selected?._id === email._id) {
        setSelected({ ...email, read: false });
      }
    } else {
      await markEmailRead(email._id);
      setEmails((prev) =>
        prev.map((e) => (e._id === email._id ? { ...e, read: true } : e))
      );
      if (selected?._id === email._id) {
        setSelected({ ...email, read: true });
      }
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Email</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} unread`
                : "No unread emails"}
            </p>
          </div>
          <Button
            onClick={() => {
              setView(view === "compose" ? "inbox" : "compose");
              setSelected(null);
            }}
            variant={view === "compose" ? "outline" : "default"}
          >
            {view === "compose" ? "Back to Sent" : "Compose"}
          </Button>
        </div>

        {view === "compose" ? (
          /* ── Compose ── */
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Email</CardTitle>
              <CardDescription>
                Send a custom email from your UnitedTax address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={action} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="to">Recipient</Label>
                  <Input
                    id="to"
                    name="to"
                    type="email"
                    placeholder="client@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    defaultValue="Can"
                    placeholder="Can"
                  />
                  <p className="text-xs text-muted-foreground">
                    Display name — always sends from{" "}
                    <span className="font-medium">can@unitedtax.us</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject line..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Message</Label>
                  <Textarea
                    id="body"
                    name="body"
                    placeholder="Write your email here..."
                    className="min-h-[200px]"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Plain text — blank lines become paragraph breaks.
                  </p>
                </div>

                <Button type="submit" disabled={isPending} size="lg">
                  {isPending ? "Sending..." : "Send Email"}
                </Button>

                {state?.success && (
                  <p className="text-sm text-green-600">
                    Email sent successfully.
                  </p>
                )}
                {state?.error && (
                  <p className="text-sm text-destructive">
                    Error: {state.error}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        ) : selected ? (
          /* ── Detail view ── */
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <CardTitle className="text-lg truncate">
                    {selected.subject}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    To: {selected.to} &middot;{" "}
                    {new Date(selected.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleRead(selected)}
                  >
                    Mark {selected.read ? "unread" : "read"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelected(null)}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selected.status === "failed" && (
                <div className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  Failed: {selected.error}
                </div>
              )}
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                {selected.body}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* ── Email list ── */
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <p className="p-6 text-sm text-muted-foreground">
                  Loading...
                </p>
              ) : emails.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">
                  No emails sent yet. Click Compose to send your first email.
                </p>
              ) : (
                <ul className="divide-y">
                  {emails.map((email) => (
                    <li key={email._id}>
                      <button
                        onClick={() => handleSelect(email)}
                        className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/50 flex items-start gap-3 ${
                          !email.read ? "bg-muted/30" : ""
                        }`}
                      >
                        {/* Unread dot */}
                        <span className="mt-1.5 shrink-0">
                          {!email.read ? (
                            <span className="block size-2 rounded-full bg-primary" />
                          ) : (
                            <span className="block size-2" />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`truncate text-sm ${
                                !email.read ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {email.to}
                            </span>
                            {email.status === "failed" && (
                              <Badge
                                variant="destructive"
                                className="text-[10px] px-1.5 py-0"
                              >
                                Failed
                              </Badge>
                            )}
                            <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                              {timeAgo(email.createdAt)}
                            </span>
                          </div>
                          <p
                            className={`truncate text-sm ${
                              !email.read
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {email.subject}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {email.body.slice(0, 100)}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
