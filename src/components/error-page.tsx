import {Button} from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import {Home, RotateCcw} from "lucide-react";
import {motion} from "motion/react";
import {Link, useRouter} from "@tanstack/react-router";

const PRIMARY_ORB_HORIZONTAL_OFFSET = 40;
const PRIMARY_ORB_VERTICAL_OFFSET = 20;

export function ErrorPage({ error }: { error: Error }) {
	const router = useRouter();

	return (
		<div
			className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)] text-foreground">
			<div
				aria-hidden={true}
				className="-z-10 absolute inset-0 overflow-hidden"
			>
				<motion.div
					animate={{
						x: [
							0,
							PRIMARY_ORB_HORIZONTAL_OFFSET,
							-PRIMARY_ORB_HORIZONTAL_OFFSET,
							0,
						],
						y: [
							0,
							PRIMARY_ORB_VERTICAL_OFFSET,
							-PRIMARY_ORB_VERTICAL_OFFSET,
							0,
						],
						rotate: [0, 10, -10, 0],
					}}
					className="absolute top-1/2 left-1/3 size-90 rounded-full bg-linear-to-tr from-red-500/20 to-orange-500/20 blur-3xl"
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						duration: 4,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					animate={{
						x: [
							0,
							-PRIMARY_ORB_HORIZONTAL_OFFSET,
							PRIMARY_ORB_HORIZONTAL_OFFSET,
							0,
						],
						y: [
							0,
							-PRIMARY_ORB_VERTICAL_OFFSET,
							PRIMARY_ORB_VERTICAL_OFFSET,
							0,
						],
					}}
					className="absolute right-1/4 bottom-1/3 size-120 rounded-full bg-linear-to-br from-rose-400/10 to-red-400/10 blur-3xl"
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						duration: 4,
						ease: "easeInOut",
					}}
				/>
			</div>

			<Empty>
				<EmptyHeader>
					<EmptyTitle className="font-extrabold text-8xl">Error</EmptyTitle>
					<EmptyDescription className="max-w-md wrap-break-word">
						{error.message || "An unexpected error occurred. Please try again later."}
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button
							onClick={() => {
								router.invalidate();
							}}
						>
							<RotateCcw />
							Try Again
						</Button>
						<Button variant="outline" render={<Link to={'/'}/>} nativeButton={false}>
							<Home/>
							Go Home
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
