import {describe, expect, it, vi} from "vitest";
import {ACCOUNT_RATE_LIMITS_METHOD} from "../../AcpExtensions";
import type {RateLimitSnapshot} from "../../app-server/v2";
import {createCodexMockTestFixture} from "../acp-test-utils";

describe("Codex account rate limits extension", () => {
    it("returns the current rate limits", async () => {
        const fixture = createCodexMockTestFixture();
        const rateLimits: RateLimitSnapshot = {
            limitId: "codex",
            limitName: "Codex",
            primary: {
                usedPercent: 20,
                windowDurationMins: 300,
                resetsAt: 1_700_000_000,
            },
            secondary: null,
            credits: null,
            individualLimit: null,
            spendControlReached: null,
            planType: null,
            rateLimitReachedType: null,
        };
        const response = {
            rateLimits,
            rateLimitsByLimitId: null,
            rateLimitResetCredits: null,
        };
        vi.spyOn(fixture.getCodexAppServerClient(), "accountRateLimitsRead").mockResolvedValue(response);

        await expect(
            fixture.getCodexAcpAgent().extMethod(ACCOUNT_RATE_LIMITS_METHOD, {}),
        ).resolves.toEqual(response);
    });
});
