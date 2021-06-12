
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formatBytes } from "./formatBytes";

type FormInputs = {
    step: number,
    currentSize: number,
};

type PartiallyControlsProps = {
    maxSize: number,
    loadPartially: (size: number) => Promise<void>
}

const stepBytes = [1, 5, 10, 20, 50, 100].map(i => i * 1024)

export function PartiallyControls({ maxSize, loadPartially }: PartiallyControlsProps) {

    const { register, handleSubmit, watch, setValue } = useForm<FormInputs>({
        defaultValues: {
            currentSize: maxSize,
            step: stepBytes[1],
        },
    });

    useEffect(() => {
        if (watch("currentSize") === 0) {
            setValue('currentSize', maxSize);
        }
    }, [maxSize]);


    const onSubmit: SubmitHandler<FormInputs> = data => {
        loadPartially(data.currentSize)
    }

    useEffect(() => {
        watch((values, { name }) => {
            if (name === "currentSize") {
                loadPartially(values.currentSize)
            }
        });
    }, [watch]);


    const step = watch("step");
    const maxRange = Math.ceil(maxSize / step) * step
    const currentSize = Math.min(watch("currentSize"), maxSize)

    return (
        <form className="partially-controls" onSubmit={handleSubmit(onSubmit) as any}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    Step:
                    <select {...register("step")}>
                        {stepBytes.map((value, index) => <option key={index} value={value}>{formatBytes(value, 0)}</option>)}
                    </select>
                </div>
                <span style={{ minWidth: 70 }}>{formatBytes(currentSize)}</span>
                <input style={{ flexGrow: 1, marginRight: 20 }} {...register("currentSize")} type="range" min={0} max={maxRange} step={watch("step")} />
                <span style={{ minWidth: 70 }}>{formatBytes(maxSize)}</span>
            </div>
        </form>
    );
}
