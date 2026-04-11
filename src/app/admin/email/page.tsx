"use client";

import { useEffect, useState, useActionState, useCallback } from "react";
import {
  sendCustomEmail,
  getEmails,
  markEmailRead,
  markEmailUnread,
  refetchEmailContent,
  getAttachmentDownloadUrl,
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

type Attachment = {
  resendId: string;
  filename: string;
  size: number;
  contentType: string;
};

type EmailItem = {
  _id: string;
  direction: string;
  to: string;
  from?: string;
  fromName: string;
  subject: string;
  body: string;
  resendId?: string;
  attachments?: Attachment[];
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

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

type Filter = "all" | "received" | "sent";

export default function AdminEmailPage() {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [selected, setSelected] = useState<EmailItem | null>(null);
  const [view, setView] = useState<"inbox" | "compose">("inbox");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<{ email: string; subject: string } | null>(null);
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

  const filtered = emails.filter((e) => {
    if (filter === "all") return true;
    return e.direction === filter;
  });

  const inboundUnread = emails.filter((e) => e.direction === "received" && !e.read).length;

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
              {inboundUnread > 0
                ? `${inboundUnread} new incoming`
                : "No unread emails"}
            </p>
          </div>
          <Button
            onClick={() => {
              if (view === "compose") {
                setView("inbox");
              } else {
                setReplyTo(null);
                setView("compose");
              }
              setSelected(null);
            }}
            variant={view === "compose" ? "outline" : "default"}
          >
            {view === "compose" ? "Back to Inbox" : "Compose"}
          </Button>
        </div>

        {view === "compose" ? (
          /* ── Compose ── */
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {replyTo ? `Reply to ${replyTo.email}` : "New Email"}
              </CardTitle>
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
                    defaultValue={replyTo?.email || ""}
                    key={replyTo?.email || "new"}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    defaultValue="Sam"
                    placeholder="Sam"
                  />
                  <p className="text-xs text-muted-foreground">
                    Display name — always sends from{" "}
                    <span className="font-medium">sam@unitedtax.us</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject line..."
                    defaultValue={replyTo?.subject || ""}
                    key={replyTo?.subject || "new"}
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

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <Input
                    id="attachments"
                    name="attachments"
                    type="file"
                    multiple
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional — select one or more files to attach.
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
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={selected.direction === "received" ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {selected.direction === "received" ? "Received" : "Sent"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg truncate">
                    {selected.subject}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {selected.direction === "received"
                      ? `From: ${selected.from || selected.fromName}`
                      : `To: ${selected.to}`}
                    {" "}&middot;{" "}
                    {new Date(selected.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex shrink-0 gap-2">
                  {selected.direction === "received" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleRead(selected)}
                    >
                      Mark {selected.read ? "unread" : "read"}
                    </Button>
                  )}
                  {selected.direction === "received" && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setReplyTo({
                          email: selected.from || selected.fromName,
                          subject: selected.subject.startsWith("Re: ")
                            ? selected.subject
                            : `Re: ${selected.subject}`,
                        });
                        setView("compose");
                        setSelected(null);
                      }}
                    >
                      Reply
                    </Button>
                  )}
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
              {selected.body === "(no content)" && selected.direction === "received" ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground italic">(no content)</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const result = await refetchEmailContent(selected._id);
                      if (result.success) {
                        const updated = {
                          ...selected,
                          body: result.body || selected.body,
                          attachments: result.attachments || selected.attachments,
                        };
                        setSelected(updated);
                        setEmails((prev) =>
                          prev.map((e) =>
                            e._id === selected._id ? { ...e, ...updated } : e
                          )
                        );
                      }
                    }}
                  >
                    Refetch content from Resend
                  </Button>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                  {selected.body}
                </div>
              )}

              {/* Attachments */}
              {selected.attachments && selected.attachments.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Attachments ({selected.attachments.length})
                  </p>
                  <div className="space-y-2">
                    {selected.attachments.map((att) => (
                      <div
                        key={att.resendId}
                        className="flex items-center gap-3 rounded-md border px-3 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{att.filename}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatBytes(att.size)} &middot; {att.contentType}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            if (!selected.resendId) return;
                            const result = await getAttachmentDownloadUrl(
                              selected.resendId,
                              att.resendId
                            );
                            if (result.success && result.url) {
                              window.open(result.url, "_blank");
                            }
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* ── Email list ── */
          <Card>
            {/* Filter tabs */}
            <div className="flex gap-1 px-4 pt-3">
              {(["all", "received", "sent"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {f === "all" ? "All" : f === "received" ? "Inbox" : "Sent"}
                  {f === "received" && inboundUnread > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center size-4 rounded-full bg-primary-foreground text-primary text-[10px]">
                      {inboundUnread}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <CardContent className="p-0 mt-2">
              {loading ? (
                <p className="p-6 text-sm text-muted-foreground">
                  Loading...
                </p>
              ) : filtered.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">
                  {filter === "received"
                    ? "No incoming emails yet."
                    : filter === "sent"
                      ? "No sent emails yet. Click Compose to send your first email."
                      : "No emails yet. Click Compose to send your first email."}
                </p>
              ) : (
                <ul className="divide-y">
                  {filtered.map((email) => (
                    <li key={email._id}>
                      <button
                        onClick={() => handleSelect(email)}
                        className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/50 flex items-start gap-3 ${
                          email.direction === "received" && !email.read ? "bg-muted/30" : ""
                        }`}
                      >
                        {/* Unread dot — only for received */}
                        <span className="mt-1.5 shrink-0">
                          {email.direction === "received" && !email.read ? (
                            <span className="block size-2 rounded-full bg-primary" />
                          ) : (
                            <span className="block size-2" />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`truncate text-sm ${
                                email.direction === "received" && !email.read ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {email.direction === "received"
                                ? email.from || email.fromName
                                : email.to}
                            </span>
                            <Badge
                              variant={email.direction === "received" ? "default" : "secondary"}
                              className="text-[10px] px-1.5 py-0 shrink-0"
                            >
                              {email.direction === "received" ? "In" : "Out"}
                            </Badge>
                            {email.attachments && email.attachments.length > 0 && (
                              <span className="shrink-0 text-xs text-muted-foreground" title="Has attachments">
                                📎
                              </span>
                            )}
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
                              email.direction === "received" && !email.read
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
